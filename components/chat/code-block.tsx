'use client';

import { FC, memo, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    language: string;
    value: string;
}

const CodeBlock: FC<Props> = memo(({ language, value }) => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = () => {
        if (typeof window === 'undefined' || !navigator.clipboard) return;
        navigator.clipboard.writeText(value).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return (
        <div className="relative w-full font-sans codeblock bg-zinc-950 rounded-lg overflow-hidden my-4">
            <div className="flex items-center justify-between w-full px-4 py-2 bg-zinc-800 text-zinc-100">
                <span className="text-xs lowercase">{language}</span>
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs text-zinc-100 hover:bg-zinc-700 focus-visible:ring-0"
                        onClick={copyToClipboard}
                    >
                        {isCopied ? (
                            <Check className="w-3.5 h-3.5 mr-1" />
                        ) : (
                            <Copy className="w-3.5 h-3.5 mr-1" />
                        )}
                        {isCopied ? '已复制' : '复制代码'}
                    </Button>
                </div>
            </div>
            <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                PreTag="div"
                customStyle={{
                    margin: 0,
                    width: '100%',
                    background: 'transparent',
                    padding: '1.5rem',
                    fontSize: '0.875rem',
                }}
                codeTagProps={{
                    style: {
                        fontSize: '0.875rem',
                        fontFamily: 'var(--font-mono)',
                    },
                }}
            >
                {value}
            </SyntaxHighlighter>
        </div>
    );
});

CodeBlock.displayName = 'CodeBlock';

export { CodeBlock };
