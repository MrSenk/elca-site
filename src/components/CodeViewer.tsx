
import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

interface CodeViewerProps {
    code: string;
    language: string;
}

const CodeViewer = ({ code, language }: CodeViewerProps) => {
    const [copied, setCopied] = useState(false);
    const { theme } = useApp();

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
    };

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [copied]);

    const highlightCode = (code: string, language: string) => {
        // Catppuccin colors - Mocha (dark) and Latte (light)
        const colors = theme === 'dark' ? {
            keyword: '#cba6f7',    // mauve
            string: '#a6e3a1',     // green
            comment: '#6c7086',    // overlay0
            function: '#89b4fa',   // blue
            number: '#fab387',     // peach
            class: '#f9e2af',      // yellow
            tag: '#f38ba8',        // red
            attribute: '#89dceb',  // sky
            punctuation: '#cdd6f4' // text
        } : {
            keyword: '#8839ef',    // mauve
            string: '#40a02b',     // green
            comment: '#9ca0b0',    // overlay0
            function: '#1e66f5',   // blue
            number: '#fe640b',     // peach
            class: '#df8e1d',      // yellow
            tag: '#d20f39',        // red
            attribute: '#04a5e5',  // sky
            punctuation: '#4c4f69' // text
        };

        // Escape HTML first
        let highlighted = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // Different highlighting strategies based on language
        const lang = language.toLowerCase();

        if (lang === 'html' || lang === 'xml') {
            return highlightHTML(highlighted, colors);
        } else if (lang === 'javascript' || lang === 'js') {
            return highlightJavaScript(highlighted, colors);
        } else {
            // Default to Java/Apex highlighting
            return highlightJavaApex(highlighted, colors);
        }
    };

    const highlightHTML = (code: string, colors: any) => {
        const commentPlaceholders: string[] = [];
        const stringPlaceholders: string[] = [];

        // 1. HTML Comments
        let highlighted = code.replace(
            /(&lt;!--[\s\S]*?--&gt;)/g,
            (match) => {
                const placeholder = `__COMMENT_${commentPlaceholders.length}__`;
                commentPlaceholders.push(`<span style="color: ${colors.comment}; font-style: italic;">${match}</span>`);
                return placeholder;
            }
        );

        // 2. Strings in attributes
        highlighted = highlighted.replace(
            /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
            (match) => {
                const placeholder = `__STRING_${stringPlaceholders.length}__`;
                stringPlaceholders.push(`<span style="color: ${colors.string}">${match}</span>`);
                return placeholder;
            }
        );

        // 3. HTML Tags with attributes (handle multiline and various whitespace)
        highlighted = highlighted.replace(
            /(&lt;\/?)(\w[\w-]*)((?:\s+[\w-]+(?:=(?:__STRING_\d+__|{[^}]+}|[^>\s]+))?)*\s*)(\/?>|&gt;)/gs,
            (_match, open, tagName, attrs, close) => {
                const highlightedTag = `<span style="color: ${colors.punctuation}">${open}</span><span style="color: ${colors.tag}">${tagName}</span>`;
                const highlightedAttrs = attrs.replace(
                    /([\w-]+)(=)?/g,
                    (_m: string, attr: string, eq: string) => `<span style="color: ${colors.attribute}">${attr}</span>${eq || ''}`
                );
                const highlightedClose = `<span style="color: ${colors.punctuation}">${close}</span>`;
                return highlightedTag + highlightedAttrs + highlightedClose;
            }
        );

        // 4. Template literals ${...}
        highlighted = highlighted.replace(
            /\$\{([^}]+)\}/g,
            `<span style="color: ${colors.function}; font-weight: bold;">$\{</span><span style="color: ${colors.class}">$1</span><span style="color: ${colors.function}; font-weight: bold;">\}</span>`
        );

        // Restore strings
        stringPlaceholders.forEach((replacement, index) => {
            highlighted = highlighted.replace(`__STRING_${index}__`, replacement);
        });

        // Restore comments
        commentPlaceholders.forEach((replacement, index) => {
            highlighted = highlighted.replace(`__COMMENT_${index}__`, replacement);
        });

        return highlighted;
    };

    const highlightJavaScript = (code: string, colors: any) => {
        const commentPlaceholders: string[] = [];
        const stringPlaceholders: string[] = [];

        // 1. Comments
        let highlighted = code.replace(
            /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g,
            (match) => {
                const placeholder = `__COMMENT_${commentPlaceholders.length}__`;
                commentPlaceholders.push(`<span style="color: ${colors.comment}; font-style: italic;">${match}</span>`);
                return placeholder;
            }
        );

        // 2. Strings and template literals
        highlighted = highlighted.replace(
            /(`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
            (match) => {
                const placeholder = `__STRING_${stringPlaceholders.length}__`;
                stringPlaceholders.push(`<span style="color: ${colors.string}">${match}</span>`);
                return placeholder;
            }
        );

        // 3. JavaScript keywords
        highlighted = highlighted.replace(
            /\b(import|export|from|default|const|let|var|function|class|extends|new|this|super|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|async|await|of|in|typeof|instanceof|void|delete)\b/g,
            `<span style="color: ${colors.keyword}">$1</span>`);

        // 4. LWC decorators
        highlighted = highlighted.replace(
            /@(api|wire|track)\b/g,
            `<span style="color: ${colors.keyword}; font-weight: bold;">@$1</span>`
        );

        // 5. Numbers
        highlighted = highlighted.replace(
            /\b(\d+)\b/g,
            `<span style="color: ${colors.number}">$1</span>`
        );

        // 6. Class names (capitalized)
        highlighted = highlighted.replace(
            /\b([A-Z][a-zA-Z0-9_]*)\b/g,
            `<span style="color: ${colors.class}">$1</span>`
        );

        // 7. Functions (word followed by parenthesis)
        highlighted = highlighted.replace(
            /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g,
            `<span style="color: ${colors.function}">$1</span>`
        );

        // 8. Object properties (word.property)
        highlighted = highlighted.replace(
            /\.([a-zA-Z_][a-zA-Z0-9_]*)/g,
            `.<span style="color: ${colors.attribute}">$1</span>`
        );

        // Restore strings
        stringPlaceholders.forEach((replacement, index) => {
            highlighted = highlighted.replace(`__STRING_${index}__`, replacement);
        });

        // Restore comments
        commentPlaceholders.forEach((replacement, index) => {
            highlighted = highlighted.replace(`__COMMENT_${index}__`, replacement);
        });

        return highlighted;
    };

    const highlightJavaApex = (code: string, colors: any) => {
        const commentPlaceholders: string[] = [];
        const stringPlaceholders: string[] = [];

        // 1. Comments
        let highlighted = code.replace(
            /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g,
            (match) => {
                const placeholder = `__COMMENT_${commentPlaceholders.length}__`;
                commentPlaceholders.push(`<span style="color: ${colors.comment}; font-style: italic;">${match}</span>`);
                return placeholder;
            }
        );

        // 2. Strings
        highlighted = highlighted.replace(
            /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
            (match) => {
                const placeholder = `__STRING_${stringPlaceholders.length}__`;
                stringPlaceholders.push(`<span style="color: ${colors.string}">${match}</span>`);
                return placeholder;
            }
        );

        // 3. Apex/Java keywords
        highlighted = highlighted.replace(
            /\b(public|private|protected|static|final|abstract|class|interface|enum|void|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|new|this|super|extends|implements|package|import|true|false|null|virtual|override|global|with|without|sharing|inherited|testMethod|webservice)\b/g,
            `<span style="color: ${colors.keyword}">$1</span>`
        );

        // 4. Apex annotations
        highlighted = highlighted.replace(
            /@(isTest|TestSetup|InvocableMethod|InvocableVariable|AuraEnabled|future|RemoteAction|ReadOnly|TestVisible)\b/g,
            `<span style="color: ${colors.keyword}; font-weight: bold;">@$1</span>`
        );

        // 5. Apex built-in classes
        highlighted = highlighted.replace(
            /\b(System|Test|Database|String|Integer|Boolean|Decimal|Date|DateTime|Time|List|Set|Map|SObject|Schema|Trigger|ApexPages|UserInfo)\b/g,
            `<span style="color: ${colors.class}; font-weight: bold;">$1</span>`
        );

        // 6. SOQL keywords
        highlighted = highlighted.replace(
            /\b(SELECT|FROM|WHERE|ORDER BY|GROUP BY|LIMIT|OFFSET|INSERT|UPDATE|DELETE|UPSERT|AND|OR|NOT|IN|LIKE|ASC|DESC)\b/g,
            `<span style="color: ${colors.keyword}">$1</span>`
        );

        // 7. Numbers
        highlighted = highlighted.replace(
            /\b(\d+)\b/g,
            `<span style="color: ${colors.number}">$1</span>`
        );

        // 8. Class names (capitalized words)
        highlighted = highlighted.replace(
            /\b([A-Z][a-zA-Z0-9_]*)\b/g,
            `<span style="color: ${colors.class}">$1</span>`
        );

        // 9. Functions/Methods
        highlighted = highlighted.replace(
            /\b([a-z][a-zA-Z0-9_]*)\s*(?=\()/g,
            `<span style="color: ${colors.function}">$1</span>`
        );

        // Restore strings
        stringPlaceholders.forEach((replacement, index) => {
            highlighted = highlighted.replace(`__STRING_${index}__`, replacement);
        });

        // Restore comments
        commentPlaceholders.forEach((replacement, index) => {
            highlighted = highlighted.replace(`__COMMENT_${index}__`, replacement);
        });

        return highlighted;
    };

    return (
        <div className="relative group my-6">
            <div className="absolute top-3 right-3 flex gap-2 items-center z-10">
                <button
                    onClick={handleCopy}
                    className="px-3 py-1 text-xs bg-theme-overlay/10 hover:bg-theme-overlay/20 text-theme-text border border-theme-overlay/20 rounded transition-colors"
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <pre className="bg-theme-base border-2 border-theme-blue/30 rounded-lg p-6 overflow-x-auto">
                <code
                    className="text-sm font-mono leading-relaxed whitespace-pre"
                    dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
                />
            </pre>
        </div>
    );
};

export default CodeViewer;
