import React, { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { FileTree, FileNode } from './FileTree';
import {
    Code2,
    Eye,
    Download,
    ExternalLink,
    Copy,
    Check,
    FileCode,
    FolderTree,
    Save
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface PreviewPanelProps {
    files: FileNode[];
    selectedFile: FileNode | null;
    onSelectFile: (file: FileNode) => void;
    onFileChange?: (path: string, content: string) => void;
    previewUrl?: string;
    isLoading?: boolean;
    totalFiles?: number;
    onDownload?: () => void;
}

// Determine language for Monaco from file extension
const getLanguage = (path: string): string => {
    const ext = path.split('.').pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
        tsx: 'typescript',
        ts: 'typescript',
        jsx: 'javascript',
        js: 'javascript',
        css: 'css',
        html: 'html',
        json: 'json',
        md: 'markdown',
    };
    return languageMap[ext || ''] || 'plaintext';
};

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
    files,
    selectedFile,
    onSelectFile,
    onFileChange,
    previewUrl,
    totalFiles = 0,
    onDownload
}) => {
    const [activeTab, setActiveTab] = useState<'files' | 'preview' | 'code'>('files');
    const [copied, setCopied] = useState(false);
    const [editedContent, setEditedContent] = useState<string>('');
    const [hasChanges, setHasChanges] = useState(false);

    const handleCopyCode = () => {
        const content = hasChanges ? editedContent : selectedFile?.content;
        if (content) {
            navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleEditorChange = useCallback((value: string | undefined) => {
        if (value !== undefined) {
            setEditedContent(value);
            setHasChanges(value !== selectedFile?.content);
        }
    }, [selectedFile?.content]);

    const handleSave = useCallback(() => {
        if (selectedFile && hasChanges && onFileChange) {
            onFileChange(selectedFile.path, editedContent);
            setHasChanges(false);
        }
    }, [selectedFile, hasChanges, editedContent, onFileChange]);

    // Reset edited content when file changes
    React.useEffect(() => {
        if (selectedFile?.content) {
            setEditedContent(selectedFile.content);
            setHasChanges(false);
        }
    }, [selectedFile?.path, selectedFile?.content]);

    return (
        <div className="flex flex-col h-full bg-[#0a0a0a] border-l border-[#2e2e2e]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#2e2e2e] bg-[#141414]">
                <div className="flex items-center gap-3">
                    <h3 className="text-sm font-medium text-gray-200">Project Files</h3>
                    {totalFiles > 0 && (
                        <Badge variant="success">{totalFiles} files</Badge>
                    )}
                </div>

                {onDownload && totalFiles > 0 && (
                    <Button variant="secondary" size="sm" onClick={onDownload}>
                        <Download className="w-4 h-4" />
                        Download
                    </Button>
                )}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#2e2e2e]">
                <button
                    onClick={() => setActiveTab('files')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === 'files'
                        ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-500/5'
                        : 'text-gray-500 hover:text-gray-300'
                        }`}
                >
                    <FolderTree className="w-4 h-4" />
                    Files
                </button>
                <button
                    onClick={() => setActiveTab('code')}
                    disabled={!selectedFile}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === 'code'
                        ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-500/5'
                        : 'text-gray-500 hover:text-gray-300 disabled:opacity-50'
                        }`}
                >
                    <Code2 className="w-4 h-4" />
                    Code
                    {hasChanges && <span className="w-2 h-2 bg-amber-400 rounded-full" />}
                </button>
                <button
                    onClick={() => setActiveTab('preview')}
                    disabled={!previewUrl}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === 'preview'
                        ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-500/5'
                        : 'text-gray-500 hover:text-gray-300 disabled:opacity-50'
                        }`}
                >
                    <Eye className="w-4 h-4" />
                    Preview
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
                {activeTab === 'files' && (
                    <div className="h-full overflow-y-auto">
                        <FileTree
                            files={files}
                            selectedFile={selectedFile?.path}
                            onSelectFile={(file) => {
                                onSelectFile(file);
                                if (file.type === 'file') {
                                    setActiveTab('code');
                                }
                            }}
                        />
                    </div>
                )}

                {activeTab === 'code' && selectedFile && (
                    <div className="h-full flex flex-col">
                        {/* File header */}
                        <div className="flex items-center justify-between px-4 py-2 bg-[#141414] border-b border-[#2e2e2e]">
                            <div className="flex items-center gap-2">
                                <FileCode className="w-4 h-4 text-blue-400" />
                                <span className="text-sm text-gray-300">{selectedFile.path}</span>
                                {hasChanges && (
                                    <span className="text-xs text-amber-400">(unsaved)</span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                {hasChanges && onFileChange && (
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-1 px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded transition-colors"
                                    >
                                        <Save className="w-3 h-3" />
                                        Save
                                    </button>
                                )}
                                <button
                                    onClick={handleCopyCode}
                                    className="p-1.5 hover:bg-[#2e2e2e] rounded transition-colors"
                                >
                                    {copied ? (
                                        <Check className="w-4 h-4 text-emerald-400" />
                                    ) : (
                                        <Copy className="w-4 h-4 text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Monaco Editor */}
                        <div className="flex-1">
                            <Editor
                                height="100%"
                                language={getLanguage(selectedFile.path)}
                                value={editedContent || selectedFile.content || ''}
                                onChange={handleEditorChange}
                                theme="vs-dark"
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 13,
                                    lineNumbers: 'on',
                                    scrollBeyondLastLine: false,
                                    wordWrap: 'on',
                                    automaticLayout: true,
                                    padding: { top: 16, bottom: 16 },
                                    readOnly: !onFileChange,
                                }}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'preview' && (
                    <div className="h-full flex flex-col">
                        {previewUrl ? (
                            <>
                                <div className="flex items-center justify-between px-4 py-2 bg-[#141414] border-b border-[#2e2e2e]">
                                    <span className="text-sm text-gray-400">{previewUrl}</span>
                                    <a
                                        href={previewUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1.5 hover:bg-[#2e2e2e] rounded transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4 text-gray-500" />
                                    </a>
                                </div>
                                <div className="flex-1 bg-white">
                                    <iframe
                                        src={previewUrl}
                                        className="w-full h-full border-0"
                                        title="Preview"
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center py-8">
                                <Eye className="w-8 h-8 text-gray-600 mb-2" />
                                <p className="text-sm text-gray-500">Preview not available</p>
                                <p className="text-xs text-gray-600">Complete the build to see a preview</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
