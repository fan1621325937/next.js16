'use client';

import { FC, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './code-block';

interface Props {
    content: string;
}

const Markdown: FC<Props> = memo(({ content }) => {
    return (
        <div className="prose prose-sm max-w-none dark:prose-invert 
        prose-p:leading-relaxed prose-pre:p-0 prose-pre:bg-transparent
        prose-code:bg-zinc-100 prose-code:dark:bg-zinc-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-ol:list-decimal prose-ul:list-disc
        prose-li:my-1
        ">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        const value = String(children).replace(/\n$/, '');

                        if (!inline && match) {
                            return (
                                <CodeBlock
                                    key={Math.random()}
                                    language={match[1]}
                                    value={value}
                                />
                            );
                        }

                        return (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
});

Markdown.displayName = 'Markdown';

export { Markdown };
