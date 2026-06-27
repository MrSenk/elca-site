import { useState, useEffect } from 'react';
import type { ColorPalette } from '../types';

interface CodeViewerProps {
    code: string;
    language: string;
}

// Bebop dark syntax palette — always dark, no theme switching
const BB_COLORS: ColorPalette = {
    keyword:     '#00f0ff',  // cyan
    string:      '#ffb000',  // amber
    comment:     '#6b6b78',  // dim (italicized)
    function:    '#df8020',  // warm orange
    number:      '#df2020',  // bebop red
    class:       '#c4c4cc',  // text (slightly brighter)
    tag:         '#df2020',  // red
    attribute:   '#00f0ff',  // cyan
    punctuation: '#6b6b78',  // dim
};

const CodeViewer = ({ code, language }: CodeViewerProps) => {
    const [copied, setCopied] = useState(false);

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
        const highlighted = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        const lang = language.toLowerCase();
        if (lang === 'html' || lang === 'xml') return highlightHTML(highlighted);
        if (lang === 'javascript' || lang === 'js') return highlightJavaScript(highlighted);
        return highlightJavaApex(highlighted);
    };

    const highlightHTML = (code: string) => {
        const colors = BB_COLORS;
        const commentPlaceholders: string[] = [];
        const stringPlaceholders: string[] = [];
        const curlyPlaceholders: string[] = [];

        let h = code.replace(/(&lt;!--[\s\S]*?--&gt;)/g, (match) => {
            const p = `__COMMENT_${commentPlaceholders.length}__`;
            commentPlaceholders.push(`<span style="color:${colors.comment};font-style:italic">${match}</span>`);
            return p;
        });

        h = h.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, (match) => {
            const p = `__STRING_${stringPlaceholders.length}__`;
            stringPlaceholders.push(`<span style="color:${colors.string}">${match}</span>`);
            return p;
        });

        h = h.replace(/\{([^}]+)\}/g, (_match, content) => {
            const p = `__CURLY_${curlyPlaceholders.length}__`;
            curlyPlaceholders.push(`<span style="color:${colors.punctuation}">{</span><span style="color:${colors.class}">${content}</span><span style="color:${colors.punctuation}">}</span>`);
            return p;
        });

        h = h.replace(
            /(&lt;\/?)(\w[\w-]*)((?:\s+[\w:-]+(?:=(?:__STRING_\d+__|__CURLY_\d+__|[^>\s]+))?)*\s*)(\/?>|&gt;)/gs,
            (_match, open, tagName, attrs, close) => {
                const t = `<span style="color:${colors.punctuation}">${open}</span><span style="color:${colors.tag}">${tagName}</span>`;
                const a = attrs.replace(/([\w:-]+)(=)?/g, (_m: string, attr: string, eq: string) =>
                    `<span style="color:${colors.attribute}">${attr}</span>${eq || ''}`);
                return t + a + `<span style="color:${colors.punctuation}">${close}</span>`;
            }
        );

        curlyPlaceholders.forEach((r, i) => { h = h.replace(`__CURLY_${i}__`, r); });
        stringPlaceholders.forEach((r, i) => { h = h.replace(`__STRING_${i}__`, r); });
        commentPlaceholders.forEach((r, i) => { h = h.replace(`__COMMENT_${i}__`, r); });
        return h;
    };

    const highlightJavaScript = (code: string) => {
        const colors = BB_COLORS;
        const commentPlaceholders: string[] = [];
        const stringPlaceholders: string[] = [];

        let h = code.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, (match) => {
            const p = `__COMMENT_${commentPlaceholders.length}__`;
            commentPlaceholders.push(`<span style="color:${colors.comment};font-style:italic">${match}</span>`);
            return p;
        });

        h = h.replace(/(`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, (match) => {
            const p = `__STRING_${stringPlaceholders.length}__`;
            stringPlaceholders.push(`<span style="color:${colors.string}">${match}</span>`);
            return p;
        });

        h = h.replace(/\b(import|export|from|default|const|let|var|function|class|extends|new|this|super|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|async|await|of|in|typeof|instanceof|void|delete)\b/g,
            `<span style="color:${colors.keyword}">$1</span>`);
        h = h.replace(/@(api|wire|track)\b/g,
            `<span style="color:${colors.keyword};font-weight:bold">@$1</span>`);
        h = h.replace(/\b(\d+)\b/g,
            `<span style="color:${colors.number}">$1</span>`);
        h = h.replace(/\b([A-Z][a-zA-Z0-9_]*)\b/g,
            `<span style="color:${colors.class}">$1</span>`);
        h = h.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g,
            `<span style="color:${colors.function}">$1</span>`);
        h = h.replace(/\.([a-zA-Z_][a-zA-Z0-9_]*)/g,
            `.<span style="color:${colors.attribute}">$1</span>`);

        stringPlaceholders.forEach((r, i) => { h = h.replace(`__STRING_${i}__`, r); });
        commentPlaceholders.forEach((r, i) => { h = h.replace(`__COMMENT_${i}__`, r); });
        return h;
    };

    const highlightJavaApex = (code: string) => {
        const colors = BB_COLORS;
        const commentPlaceholders: string[] = [];
        const stringPlaceholders: string[] = [];

        let h = code.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, (match) => {
            const p = `__COMMENT_${commentPlaceholders.length}__`;
            commentPlaceholders.push(`<span style="color:${colors.comment};font-style:italic">${match}</span>`);
            return p;
        });

        h = h.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, (match) => {
            const p = `__STRING_${stringPlaceholders.length}__`;
            stringPlaceholders.push(`<span style="color:${colors.string}">${match}</span>`);
            return p;
        });

        h = h.replace(/\b(public|private|protected|static|final|abstract|class|interface|enum|void|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|new|this|super|extends|implements|package|import|true|false|null|virtual|override|global|with|without|sharing|inherited|testMethod|webservice)\b/g,
            `<span style="color:${colors.keyword}">$1</span>`);
        h = h.replace(/@(isTest|TestSetup|InvocableMethod|InvocableVariable|AuraEnabled|future|RemoteAction|ReadOnly|TestVisible)\b/g,
            `<span style="color:${colors.keyword};font-weight:bold">@$1</span>`);
        h = h.replace(/\b(System|Test|Database|String|Integer|Boolean|Decimal|Date|DateTime|Time|List|Set|Map|SObject|Schema|Trigger|ApexPages|UserInfo)\b/g,
            `<span style="color:${colors.class};font-weight:bold">$1</span>`);
        h = h.replace(/\b(SELECT|FROM|WHERE|ORDER BY|GROUP BY|LIMIT|OFFSET|INSERT|UPDATE|DELETE|UPSERT|AND|OR|NOT|IN|LIKE|ASC|DESC)\b/g,
            `<span style="color:${colors.keyword}">$1</span>`);
        h = h.replace(/\b(\d+)\b/g,
            `<span style="color:${colors.number}">$1</span>`);
        h = h.replace(/\b([A-Z][a-zA-Z0-9_]*)\b/g,
            `<span style="color:${colors.class}">$1</span>`);
        h = h.replace(/\b([a-z][a-zA-Z0-9_]*)\s*(?=\()/g,
            `<span style="color:${colors.function}">$1</span>`);

        stringPlaceholders.forEach((r, i) => { h = h.replace(`__STRING_${i}__`, r); });
        commentPlaceholders.forEach((r, i) => { h = h.replace(`__COMMENT_${i}__`, r); });
        return h;
    };

    return (
        <div className="relative group my-6">
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2"
                style={{ background: 'var(--bb-panel)', borderBottom: '1px solid var(--bb-border)' }}>
                <span className="font-terminal text-xs text-[var(--bb-dim)] tracking-widest uppercase">
                    {language.toUpperCase()} // SOURCE
                </span>
                <button
                    onClick={handleCopy}
                    className="font-terminal text-xs text-[var(--bb-dim)] hover:text-[var(--bb-amber)] border border-[var(--bb-border)] hover:border-[var(--bb-amber)] px-3 py-0.5 transition-colors tracking-widest"
                >
                    {copied ? '[COPIED]' : '[COPY]'}
                </button>
            </div>
            <pre className="overflow-x-auto pt-10 pb-6 px-6"
                style={{ background: 'var(--bb-rust)', border: '1px solid var(--bb-border)' }}>
                <code
                    className="text-sm font-mono leading-relaxed whitespace-pre"
                    style={{ color: 'var(--bb-text)' }}
                    dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
                />
            </pre>
        </div>
    );
};

export default CodeViewer;
