/**
 * File Registry - Tracks all generated files and their relationships
 * Enables agents to be aware of what exists and what needs to be connected
 */

export interface FileEntry {
    path: string;
    type: 'component' | 'page' | 'util' | 'config' | 'style' | 'layout' | 'hook';
    exports: string[];       // Named exports from this file
    defaultExport?: string;  // Default export name
    imports: string[];       // Paths this file imports from
    usedBy: string[];        // Paths that import this file
    description: string;     // What this file does
    phase: string;           // Which phase created it
}

export class FileRegistry {
    private files: Map<string, FileEntry> = new Map();

    /**
     * Register a new file in the registry
     */
    registerFile(entry: FileEntry): void {
        this.files.set(entry.path, entry);

        // Update usedBy for all imports
        for (const importPath of entry.imports) {
            const importedFile = this.files.get(importPath);
            if (importedFile && !importedFile.usedBy.includes(entry.path)) {
                importedFile.usedBy.push(entry.path);
            }
        }
    }

    /**
     * Parse file content to extract exports and imports
     */
    parseFileContent(path: string, content: string, phase: string): FileEntry {
        const exports: string[] = [];
        let defaultExport: string | undefined;
        const imports: string[] = [];

        // Extract named exports: export const/function/class Name
        const namedExportMatches = content.matchAll(/export\s+(?:const|function|class|type|interface)\s+(\w+)/g);
        for (const match of namedExportMatches) {
            exports.push(match[1]);
        }

        // Extract export { Name } from
        const reExportMatches = content.matchAll(/export\s*\{\s*([^}]+)\s*\}/g);
        for (const match of reExportMatches) {
            const names = match[1].split(',').map(n => n.trim().split(' ')[0]);
            exports.push(...names);
        }

        // Extract default exports
        const defaultMatch = content.match(/export\s+default\s+(?:function\s+)?(\w+)/);
        if (defaultMatch) {
            defaultExport = defaultMatch[1];
        }

        // Extract imports from @/ paths
        const importMatches = content.matchAll(/from\s+['"](@\/[^'"]+)['"]/g);
        for (const match of importMatches) {
            const importPath = match[1].replace('@/', 'src/');
            // Normalize path - add .tsx if needed
            const normalizedPath = importPath.match(/\.(tsx?|jsx?)$/) ? importPath : importPath + '.tsx';
            imports.push(normalizedPath);
        }

        // Determine file type
        let type: FileEntry['type'] = 'util';
        if (path.includes('/pages/')) type = 'page';
        else if (path.includes('/components/layout/')) type = 'layout';
        else if (path.includes('/components/')) type = 'component';
        else if (path.includes('/hooks/')) type = 'hook';
        else if (path.match(/\.(css|scss)$/)) type = 'style';
        else if (path.match(/(config|vite\.config|tsconfig)/)) type = 'config';

        // Generate description based on exports
        const mainExport = defaultExport || exports[0] || path.split('/').pop()?.replace(/\.\w+$/, '');
        const description = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${mainExport}`;

        return {
            path,
            type,
            exports,
            defaultExport,
            imports,
            usedBy: [],
            description,
            phase
        };
    }

    /**
     * Get files by type
     */
    getFilesByType(type: FileEntry['type']): FileEntry[] {
        return Array.from(this.files.values()).filter(f => f.type === type);
    }

    /**
     * Get all registered files
     */
    getAllFiles(): FileEntry[] {
        return Array.from(this.files.values());
    }

    /**
     * Find unused files (exported but never imported)
     */
    getUnusedFiles(): FileEntry[] {
        return Array.from(this.files.values()).filter(file => {
            // Skip config files, styles, and main entry points
            if (file.type === 'config' || file.type === 'style') return false;
            if (file.path.includes('main.tsx') || file.path.includes('App.tsx')) return false;
            if (file.path.includes('AppLayout')) return false;

            // File is unused if nothing imports it
            return file.usedBy.length === 0;
        });
    }

    /**
     * Get file entry by path
     */
    getFile(path: string): FileEntry | undefined {
        return this.files.get(path);
    }

    /**
     * Generate context summary for agents
     * This tells agents what files exist and what they export
     */
    generateContextForAgent(targetType?: FileEntry['type']): string {
        const sections: string[] = [];

        // Group by type
        const byType: Record<string, FileEntry[]> = {};
        for (const file of this.files.values()) {
            if (!byType[file.type]) byType[file.type] = [];
            byType[file.type].push(file);
        }

        // Components section
        if (byType['component']?.length) {
            sections.push('AVAILABLE COMPONENTS (you MUST use these):');
            for (const file of byType['component']) {
                const exportsStr = file.exports.length ? file.exports.join(', ') : file.defaultExport || 'default';
                sections.push(`  - ${file.path} → exports: { ${exportsStr} }`);
            }
        }

        // Layout section
        if (byType['layout']?.length) {
            sections.push('\nLAYOUT COMPONENTS:');
            for (const file of byType['layout']) {
                const exportsStr = file.exports.length ? file.exports.join(', ') : file.defaultExport || 'default';
                sections.push(`  - ${file.path} → exports: { ${exportsStr} }`);
            }
        }

        // Utils section
        if (byType['util']?.length) {
            sections.push('\nUTILITY FILES:');
            for (const file of byType['util']) {
                const exportsStr = file.exports.length ? file.exports.join(', ') : file.defaultExport || 'default';
                sections.push(`  - ${file.path} → exports: { ${exportsStr} }`);
            }
        }

        // Pages section (for reference)
        if (byType['page']?.length && targetType !== 'page') {
            sections.push('\nEXISTING PAGES:');
            for (const file of byType['page']) {
                sections.push(`  - ${file.path}`);
            }
        }

        if (sections.length === 0) {
            return 'No files generated yet.';
        }

        return sections.join('\n');
    }

    /**
     * Get import statement for a file
     */
    getImportStatement(filePath: string, fromPath: string): string {
        const file = this.files.get(filePath);
        if (!file) return '';

        // Calculate relative path or use @/ alias
        const importPath = '@/' + filePath.replace('src/', '').replace(/\.tsx?$/, '');

        if (file.defaultExport) {
            if (file.exports.length > 0) {
                return `import ${file.defaultExport}, { ${file.exports.join(', ')} } from '${importPath}';`;
            }
            return `import ${file.defaultExport} from '${importPath}';`;
        } else if (file.exports.length > 0) {
            return `import { ${file.exports.join(', ')} } from '${importPath}';`;
        }

        return `import '${importPath}';`;
    }

    /**
     * Clear the registry
     */
    clear(): void {
        this.files.clear();
    }
}
