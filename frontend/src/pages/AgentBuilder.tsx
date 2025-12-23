import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ChatPanel } from '../components/agent/ChatPanel';
import { PreviewPanel } from '../components/preview/PreviewPanel';
import { AgentMessageData, MessageType } from '../components/agent/AgentMessage';
import { ProcessingPhase } from '../components/agent/ProcessingStep';
import { AgentStatusType } from '../components/agent/AgentStatus';
import { FileNode } from '../components/preview/FileTree';
import { BACKEND_URL } from '../config';
import { useWebContainer } from '../hooks/useWebContainer';
import { ArrowLeft, Sparkles } from 'lucide-react';

// Helper to convert flat file list to tree structure
const buildFileTree = (files: { path: string; content: string }[]): FileNode[] => {
    const root: FileNode[] = [];

    files.forEach(file => {
        const parts = file.path.replace(/^\//, '').split('/');
        let current = root;
        let currentPath = '';

        parts.forEach((part, index) => {
            currentPath += '/' + part;
            const isFile = index === parts.length - 1;

            let existing = current.find(n => n.name === part);

            if (!existing) {
                existing = {
                    name: part,
                    path: currentPath,
                    type: isFile ? 'file' : 'folder',
                    children: isFile ? undefined : [],
                    content: isFile ? file.content : undefined
                };
                current.push(existing);
            }

            if (!isFile && existing.children) {
                current = existing.children;
            }
        });
    });

    // Sort: folders first, then files alphabetically
    const sortNodes = (nodes: FileNode[]): FileNode[] => {
        return nodes.sort((a, b) => {
            if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
            return a.name.localeCompare(b.name);
        }).map(node => ({
            ...node,
            children: node.children ? sortNodes(node.children) : undefined
        }));
    };

    return sortNodes(root);
};

export const AgentBuilder: React.FC = () => {
    const navigate = useNavigate();
    const webcontainer = useWebContainer();

    // State
    const [messages, setMessages] = useState<AgentMessageData[]>([]);
    const [phases, setPhases] = useState<ProcessingPhase[]>([
        { id: 'blueprint', name: 'Generating blueprint', status: 'pending' },
        { id: 'core', name: 'Creating core files', status: 'pending' },
        { id: 'components', name: 'Building components', status: 'pending', filesCreated: 0 },
        { id: 'pages', name: 'Creating pages', status: 'pending', filesCreated: 0 },
        { id: 'repair', name: 'Validation & repair', status: 'pending' }
    ]);
    const [status, setStatus] = useState<AgentStatusType>('idle');
    const [statusMessage, setStatusMessage] = useState<string>();
    const [isProcessing, setIsProcessing] = useState(false);

    const [files, setFiles] = useState<{ path: string; content: string }[]>([]);
    const [fileTree, setFileTree] = useState<FileNode[]>([]);
    const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>();

    const abortControllerRef = useRef<AbortController | null>(null);

    // Update file tree when files change
    useEffect(() => {
        if (files.length > 0) {
            const tree = buildFileTree(files);
            setFileTree(tree);
        }
    }, [files]);

    // Helper to add a message
    const addMessage = useCallback((type: MessageType, content: string, phase?: string, files?: string[]) => {
        const message: AgentMessageData = {
            id: Date.now().toString(),
            type,
            content,
            timestamp: new Date(),
            phase,
            files
        };
        setMessages(prev => [...prev, message]);
    }, []);

    // Update phase status
    const updatePhase = useCallback((id: string, status: ProcessingPhase['status'], filesCreated?: number) => {
        setPhases(prev => prev.map(p =>
            p.id === id ? { ...p, status, filesCreated: filesCreated ?? p.filesCreated } : p
        ));
    }, []);

    // Handle file content changes from Monaco Editor
    const handleFileChange = useCallback((path: string, content: string) => {
        setFiles(prev => prev.map(f =>
            f.path === path ? { ...f, content } : f
        ));

        // Also update selectedFile if it's the currently selected one
        if (selectedFile?.path === path) {
            setSelectedFile(prev => prev ? { ...prev, content } : prev);
        }
    }, [selectedFile?.path]);

    // Handle send message - Using SSE for real-time streaming
    const handleSendMessage = useCallback(async (userMessage: string) => {
        // Add user message
        addMessage('user', userMessage);

        // Reset phases
        setPhases(prev => prev.map(p => ({ ...p, status: 'pending', filesCreated: 0 })));
        setFiles([]);
        setFileTree([]);
        setSelectedFile(null);
        setPreviewUrl(undefined);

        // Set processing state
        setIsProcessing(true);
        setStatus('running');
        setStatusMessage('Agent is running...');

        // Add thinking message
        addMessage('thinking', "I'm analyzing your requirements and planning the website structure...");

        try {
            abortControllerRef.current = new AbortController();

            updatePhase('blueprint', 'in-progress');
            setStatusMessage('Generating project blueprint...');

            // Use SSE streaming endpoint
            const response = await fetch(`${BACKEND_URL}/chat/langgraph-stream`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: userMessage,
                    projectType: 'frontend'
                }),
                signal: abortControllerRef.current.signal
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            let componentCount = 0;
            let pageCount = 0;
            let totalFiles = 0;

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    const lines = chunk.split('\n').filter(line => line.startsWith('data: '));

                    for (const line of lines) {
                        try {
                            const data = JSON.parse(line.slice(6));

                            switch (data.type) {
                                case 'message':
                                    addMessage('progress', data.content, data.phase);
                                    break;

                                case 'phase':
                                    setStatusMessage(data.message);
                                    // Update phase indicators
                                    if (data.phase === 'blueprint') {
                                        updatePhase('blueprint', 'in-progress');
                                    } else if (data.phase === 'structure' || data.phase === 'core') {
                                        updatePhase('blueprint', 'complete');
                                        updatePhase('core', 'in-progress');
                                    } else if (data.phase === 'components') {
                                        updatePhase('core', 'complete');
                                        updatePhase('components', 'in-progress');
                                    } else if (data.phase === 'pages') {
                                        updatePhase('components', 'complete', componentCount);
                                        updatePhase('pages', 'in-progress');
                                    } else if (data.phase === 'validation' || data.phase === 'repair') {
                                        updatePhase('pages', 'complete', pageCount);
                                        updatePhase('repair', 'in-progress');
                                    }
                                    break;

                                case 'file':
                                    totalFiles++;
                                    const filePath = data.path.startsWith('/') ? data.path : '/' + data.path;

                                    // Add file to state
                                    setFiles(prev => [...prev, {
                                        path: filePath,
                                        content: data.content
                                    }]);

                                    // Track file types
                                    if (filePath.includes('/components/')) {
                                        componentCount++;
                                        updatePhase('components', 'in-progress', componentCount);
                                    } else if (filePath.includes('/pages/')) {
                                        pageCount++;
                                        updatePhase('pages', 'in-progress', pageCount);
                                    }

                                    // Show message every 5 files
                                    if (totalFiles % 5 === 0) {
                                        addMessage('file', `Created ${totalFiles} files...`, data.phase, [filePath]);
                                    }
                                    break;

                                case 'complete':
                                    updatePhase('blueprint', 'complete');
                                    updatePhase('core', 'complete');
                                    updatePhase('components', 'complete', componentCount);
                                    updatePhase('pages', 'complete', pageCount);
                                    updatePhase('repair', 'complete');

                                    setStatus('complete');
                                    setStatusMessage(undefined);
                                    addMessage('success', data.message || `🎉 Generated ${data.totalFiles} files successfully!`);
                                    break;

                                case 'error':
                                    throw new Error(data.message);
                            }
                        } catch (e) {
                            // Skip invalid JSON lines
                            if (line.trim() && !line.includes('data: ')) {
                                console.warn('Invalid SSE line:', line);
                            }
                        }
                    }
                }
            }

            // Try to set up WebContainer if available
            if (webcontainer && files.length > 0) {
                setStatusMessage('Setting up preview...');
                try {
                    for (const file of files) {
                        const filePath = file.path.replace(/^\//, '');
                        const parts = filePath.split('/');

                        for (let i = 0; i < parts.length - 1; i++) {
                            const dirPath = parts.slice(0, i + 1).join('/');
                            try {
                                await webcontainer.fs.mkdir(dirPath, { recursive: true });
                            } catch (e) {
                                // Directory might exist
                            }
                        }

                        await webcontainer.fs.writeFile(filePath, file.content);
                    }

                    const installProcess = await webcontainer.spawn('npm', ['install']);
                    await installProcess.exit;

                    const devProcess = await webcontainer.spawn('npm', ['run', 'dev']);

                    webcontainer.on('server-ready', (port: number, url: string) => {
                        setPreviewUrl(url);
                        addMessage('success', `Preview available at ${url}`, 'Complete');
                    });
                } catch (e) {
                    console.warn('WebContainer preview failed:', e);
                }
            }

        } catch (error: any) {
            if (error.name === 'AbortError') {
                addMessage('error', 'Generation was cancelled.');
                setStatus('idle');
            } else {
                console.error('Generation error:', error);
                addMessage('error', `Something went wrong: ${error.message || 'Unknown error'}`);
                setStatus('error');
                setStatusMessage(error.message);
            }
        } finally {
            setIsProcessing(false);
            abortControllerRef.current = null;
        }
    }, [addMessage, updatePhase, webcontainer, files]);

    // Handle stop
    const handleStop = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    }, []);

    // Handle file select
    const handleSelectFile = useCallback((file: FileNode) => {
        if (file.type === 'file') {
            // Find the full file data
            const fullFile = files.find(f => f.path === file.path);
            setSelectedFile({
                ...file,
                content: fullFile?.content || file.content
            });
        }
    }, [files]);

    // Handle download
    const handleDownload = useCallback(async () => {
        if (files.length === 0) return;

        const zip = new JSZip();

        files.forEach(file => {
            const path = file.path.replace(/^\//, '');
            zip.file(path, file.content);
        });

        const blob = await zip.generateAsync({ type: 'blob' });
        saveAs(blob, 'sitecrafter-project.zip');

        addMessage('success', 'Project downloaded successfully!');
    }, [files, addMessage]);

    return (
        <div className="flex flex-col h-screen bg-[#0a0a0a] text-white">
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-3 border-b border-[#2e2e2e] bg-[#141414]">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="p-2 hover:bg-[#2e2e2e] rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-400" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-gray-100">SiteCrafter Agent</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Powered by LangGraph + Gemini</span>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Chat Panel - Left Side */}
                <div className="w-1/2 flex flex-col border-r border-[#2e2e2e]">
                    <ChatPanel
                        messages={messages}
                        phases={phases}
                        status={status}
                        statusMessage={statusMessage}
                        onSendMessage={handleSendMessage}
                        onStop={handleStop}
                        isProcessing={isProcessing}
                    />
                </div>

                {/* Preview Panel - Right Side */}
                <div className="w-1/2 flex flex-col">
                    <PreviewPanel
                        files={fileTree}
                        selectedFile={selectedFile}
                        onSelectFile={handleSelectFile}
                        onFileChange={handleFileChange}
                        previewUrl={previewUrl}
                        isLoading={isProcessing}
                        totalFiles={files.length}
                        onDownload={handleDownload}
                    />
                </div>
            </div>
        </div>
    );
};

export default AgentBuilder;
