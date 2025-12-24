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
import { useWebContainer } from '../hooks/useWebContainer.tsx';
import { parseStackTrace } from '../utils/errorReporter';
import { ArrowLeft, Sparkles, Loader2, Zap } from 'lucide-react';
import type { FileSystemTree } from '@webcontainer/api';

const MAX_FIX_ATTEMPTS = 15;

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

// Convert flat files to WebContainer FileSystemTree format
const toWebContainerFS = (files: { path: string; content: string }[]): FileSystemTree => {
    const tree: FileSystemTree = {};

    for (const file of files) {
        const pathParts = file.path.replace(/^\//, '').split('/');
        let current: any = tree;

        for (let i = 0; i < pathParts.length; i++) {
            const part = pathParts[i];
            const isLast = i === pathParts.length - 1;

            if (isLast) {
                current[part] = { file: { contents: file.content } };
            } else {
                if (!current[part]) {
                    current[part] = { directory: {} };
                }
                current = current[part].directory;
            }
        }
    }

    return tree;
};

export const AgentBuilder: React.FC = () => {
    const navigate = useNavigate();

    // Use the enhanced WebContainer hook with all features
    const {
        isBooting,
        isInstalling,
        isRunning,
        previewUrl: wcPreviewUrl,
        error: wcError,
        terminalOutput,
        isPreWarmed,
        isPreWarming,
        mountFiles,
        startDevServer,
        updateFile,
        reset: resetWebContainer,
    } = useWebContainer();

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

    // Auto-fix state
    const [isFixing, setIsFixing] = useState(false);
    const [fixCount, setFixCount] = useState(0);
    const fixingRef = useRef(false);
    const fixAttempts = useRef(0);
    const filesRef = useRef<{ path: string; content: string }[]>([]);
    const fixedFilesRef = useRef<Set<string>>(new Set());

    const abortControllerRef = useRef<AbortController | null>(null);

    // Keep filesRef in sync
    useEffect(() => {
        filesRef.current = files;
    }, [files]);

    // Update file tree when files change
    useEffect(() => {
        if (files.length > 0) {
            const tree = buildFileTree(files);
            setFileTree(tree);
        }
    }, [files]);

    // Helper to add a message
    const addMessage = useCallback((type: MessageType, content: string, phase?: string, filesArr?: string[]) => {
        const message: AgentMessageData = {
            id: Date.now().toString(),
            type,
            content,
            timestamp: new Date(),
            phase,
            files: filesArr
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
    const handleFileChange = useCallback(async (path: string, content: string) => {
        setFiles(prev => prev.map(f =>
            f.path === path ? { ...f, content } : f
        ));

        // Also update selectedFile if it's the currently selected one
        if (selectedFile?.path === path) {
            setSelectedFile(prev => prev ? { ...prev, content } : prev);
        }

        // Update the file in WebContainer (hot reload)
        if (isRunning) {
            await updateFile(path.replace(/^\//, ''), content);
        }
    }, [selectedFile?.path, updateFile, isRunning]);

    // Parse error from terminal output
    const parseError = useCallback((output: string[]): { file: string; error: string } | null => {
        const text = output.slice(-80).join('\n');

        // Babel error
        const babelMatch = text.match(/\[plugin:vite:react-babel\]\s*([^\n:]+\.tsx?):\s*(.+?)(?:\n|$)/);
        if (babelMatch) {
            const fileName = babelMatch[1].split('/').pop() || '';
            const fileMatch = text.match(new RegExp(`src/[\\w\\-\\/]*${fileName}`));
            return {
                file: fileMatch ? fileMatch[0] : `src/components/ui/${fileName}`,
                error: `Babel Syntax Error: ${babelMatch[2]}\n\nFull error:\n${text.slice(-600)}`,
            };
        }

        // ESBuild error
        const esbuildMatch = text.match(/\[plugin:vite:esbuild\]\s*([^\n:]+\.tsx?):(\d+):(\d+):\s*(.+?)(?:\n|$)/);
        if (esbuildMatch) {
            const fileName = esbuildMatch[1].split('/').pop() || '';
            const fileMatch = text.match(new RegExp(`src/[\\w\\-\\/]*${fileName}`));
            return {
                file: fileMatch ? fileMatch[0] : `src/components/ui/${fileName}`,
                error: `ESBuild Error at line ${esbuildMatch[2]}: ${esbuildMatch[4]}\n\nFull error:\n${text.slice(-600)}`,
            };
        }

        // TypeScript error
        const tsMatch = text.match(/(src\/[\w\-\/]+\.tsx?)\((\d+),(\d+)\):\s*error\s*(TS\d+):\s*(.+?)(?:\n|$)/);
        if (tsMatch) {
            return {
                file: tsMatch[1],
                error: `TypeScript Error ${tsMatch[4]} at line ${tsMatch[2]}: ${tsMatch[5]}\n\nFull error:\n${text.slice(-600)}`,
            };
        }

        // Generic errors
        if (text.includes('Unexpected token') || text.includes('unexpected token')) {
            const fileMatch = text.match(/(?:src\/[\w\-\/]+\.tsx?)/);
            if (fileMatch) {
                return { file: fileMatch[0], error: `Syntax Error:\n${text.slice(-600)}` };
            }
        }

        // Module not found
        if (/Cannot find module ['"]([^'"]+)['"]/.test(text)) {
            const fileMatch = text.match(/(?:src\/[\w\-\/]+\.tsx?)/);
            if (fileMatch) {
                return { file: fileMatch[0], error: text.slice(-500) };
            }
        }

        return null;
    }, []);

    // Fix code error using LLM
    const fixCodeError = useCallback(async (errorFile: string, errorText: string) => {
        if (fixingRef.current) return false;

        const errorKey = `${errorFile}:${errorText.slice(0, 100)}`;
        if (fixedFilesRef.current.has(errorKey)) {
            console.log(`Already fixed: ${errorFile}, skipping`);
            return false;
        }

        fixingRef.current = true;
        setIsFixing(true);
        fixAttempts.current++;

        try {
            let targetFile = filesRef.current.find(f =>
                f.path === errorFile ||
                f.path.endsWith(errorFile) ||
                f.path.includes(errorFile.replace('src/', ''))
            );

            if (!targetFile?.content) {
                const fileName = errorFile.split('/').pop();
                if (fileName) {
                    targetFile = filesRef.current.find(f => f.path.endsWith(fileName));
                }
            }

            if (!targetFile?.content) {
                console.warn(`File not found: ${errorFile}`);
                return false;
            }

            console.log(`🔧 Fixing code in: ${targetFile.path}`);
            addMessage('thinking', `🔧 Auto-fixing error in ${targetFile.path}...`);

            const response = await fetch(`${BACKEND_URL}/api/fix-error`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    error: errorText,
                    filePath: targetFile.path,
                    fileContent: targetFile.content,
                }),
            });

            if (!response.ok) throw new Error('Backend failed');

            const { fixedCode } = await response.json();

            if (fixedCode && fixedCode !== targetFile.content) {
                // Update file in state
                setFiles(prev => prev.map(f =>
                    f.path === targetFile!.path ? { ...f, content: fixedCode } : f
                ));

                // Update file in WebContainer
                await updateFile(targetFile.path.replace(/^\//, ''), fixedCode);

                setFixCount(prev => prev + 1);
                fixedFilesRef.current.add(errorKey);

                addMessage('success', `✅ Fixed error in ${targetFile.path}`);
                return true;
            }
        } catch (err) {
            console.error('Fix failed:', err);
            addMessage('error', `❌ Auto-fix failed: ${err}`);
        } finally {
            fixingRef.current = false;
            setIsFixing(false);
        }
        return false;
    }, [addMessage, updateFile]);

    // Watch terminal output for errors and auto-fix
    useEffect(() => {
        if (!isRunning || fixingRef.current || isFixing) return;
        if (fixAttempts.current >= MAX_FIX_ATTEMPTS) return;

        const errorInfo = parseError(terminalOutput);
        if (errorInfo && errorInfo.file) {
            const timeoutId = setTimeout(() => {
                fixCodeError(errorInfo.file, errorInfo.error);
            }, 2000);

            return () => clearTimeout(timeoutId);
        }
    }, [terminalOutput, isRunning, isFixing, parseError, fixCodeError]);

    // Listen for runtime errors from preview iframe
    useEffect(() => {
        const handleRuntimeError = (event: MessageEvent) => {
            if (event.data?.type !== 'RUNTIME_ERROR') return;
            if (!isRunning || fixingRef.current || isFixing) return;
            if (fixAttempts.current >= MAX_FIX_ATTEMPTS) return;

            const { message, stack, errorType } = event.data;
            console.log('🔴 Runtime error received:', { message, stack, errorType });

            const { filePath } = parseStackTrace(stack || '');

            if (filePath) {
                const errorContext = `Runtime Error (${errorType})\n${message}\n\nStack trace:\n${stack}`;
                setTimeout(() => {
                    fixCodeError(filePath, errorContext);
                }, 1500);
            } else {
                console.warn('Could not extract file path from runtime error:', stack);
            }
        };

        window.addEventListener('message', handleRuntimeError);
        return () => window.removeEventListener('message', handleRuntimeError);
    }, [isRunning, isFixing, fixCodeError]);

    // Handle send message - Using SSE for real-time streaming
    const handleSendMessage = useCallback(async (userMessage: string) => {
        // Add user message
        addMessage('user', userMessage);

        // Reset state
        setPhases(prev => prev.map(p => ({ ...p, status: 'pending', filesCreated: 0 })));
        setFiles([]);
        setFileTree([]);
        setSelectedFile(null);
        setFixCount(0);
        fixAttempts.current = 0;
        fixedFilesRef.current.clear();

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
                headers: { 'Content-Type': 'application/json' },
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
            const collectedFiles: { path: string; content: string }[] = [];

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

                                    collectedFiles.push({ path: filePath, content: data.content });
                                    setFiles(prev => [...prev, { path: filePath, content: data.content }]);

                                    if (filePath.includes('/components/')) {
                                        componentCount++;
                                        updatePhase('components', 'in-progress', componentCount);
                                    } else if (filePath.includes('/pages/')) {
                                        pageCount++;
                                        updatePhase('pages', 'in-progress', pageCount);
                                    }

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

                                    // Start WebContainer preview after generation completes
                                    if (collectedFiles.length > 0) {
                                        setStatusMessage('Starting preview...');
                                        addMessage('thinking', '🚀 Starting WebContainer preview...');

                                        try {
                                            const fsTree = toWebContainerFS(collectedFiles);
                                            await mountFiles(fsTree);
                                            await startDevServer();
                                            addMessage('success', '✅ Preview is loading with auto-fix enabled!');
                                        } catch (e) {
                                            console.warn('WebContainer preview failed:', e);
                                            addMessage('error', `Preview failed: ${e}`);
                                        }
                                    }
                                    break;

                                case 'error':
                                    throw new Error(data.message);
                            }
                        } catch (e) {
                            if (line.trim() && !line.includes('data: ')) {
                                console.warn('Invalid SSE line:', line);
                            }
                        }
                    }
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
    }, [addMessage, updatePhase, mountFiles, startDevServer]);

    // Handle stop
    const handleStop = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    }, []);

    // Handle file select
    const handleSelectFile = useCallback((file: FileNode) => {
        if (file.type === 'file') {
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
        <div className="flex flex-col h-screen bg-[#0a0a0a] text-white relative">
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

                <div className="flex items-center gap-4">
                    {/* WebContainer Status */}
                    <div className="flex items-center gap-2 text-xs">
                        {isPreWarmed && !isPreWarming && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 rounded-full text-emerald-500">
                                <Zap className="w-3 h-3" />
                                Ready
                            </span>
                        )}
                        {isFixing && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-orange-500/10 rounded-full text-orange-500">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                Auto-fixing...
                            </span>
                        )}
                        {fixCount > 0 && (
                            <span className="px-2 py-1 bg-emerald-500/10 rounded-full text-emerald-400">
                                {fixCount} {fixCount === 1 ? 'fix' : 'fixes'}
                            </span>
                        )}
                    </div>
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
                        previewUrl={wcPreviewUrl || undefined}
                        isLoading={isProcessing || isInstalling || isBooting}
                        totalFiles={files.length}
                        onDownload={handleDownload}
                    />
                </div>
            </div>
        </div>
    );
};

export default AgentBuilder;
