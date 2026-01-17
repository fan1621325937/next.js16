'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChat } from '@ai-sdk/react';
import { Markdown } from '@/components/chat/markdown';

export default function HomePage() {
    const [input, setInput] = useState(''); //输入框的值
    const messagesEndRef = useRef<HTMLDivElement>(null); //获取消息结束的ref
    //useChat 内部封装了流式响应 默认会向/api/chat 发送请求
    const { messages, sendMessage } = useChat({
        onFinish: () => {
            setInput('');
        }
    });

    // 自动滚动到底部
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    //回车发送消息
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (input.trim()) {
                sendMessage({ text: input });
            }
        }
    };

    return (
        <div className='flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950'>
            {/* 头部标题 */}
            <div className='bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-10 border-b border-zinc-200 dark:border-zinc-800'>
                <div className='max-w-4xl mx-auto px-6 py-4 flex items-center justify-between'>
                    <div>
                        <h1 className='text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                            AI 智能助手
                        </h1>
                        <p className='text-xs text-zinc-500 mt-0.5 font-medium'>Powered by DeepSeek</p>
                    </div>
                </div>
            </div>

            {/* 消息区域 */}
            <div className='flex-1 overflow-y-auto px-4 py-8 custom-scrollbar'>
                <div className='max-w-4xl mx-auto space-y-8'>
                    {messages.length === 0 ? (
                        <div className='flex flex-col items-center justify-center h-[60vh] text-center'>
                            <div className='w-20 h-20 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-3xl flex items-center justify-center mb-6 ring-1 ring-blue-500/20'>
                                <svg className='w-10 h-10 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' />
                                </svg>
                            </div>
                            <h2 className='text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-3'>有什么我可以帮你的吗？</h2>
                            <p className='text-zinc-500 max-w-sm'>我是你的 AI 助手，可以帮你写代码、翻译文档或者回答任何问题。</p>
                        </div>
                    ) : (
                        messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}
                            >
                                <div className={`flex gap-4 max-w-[90%] md:max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    {/* 头像 */}
                                    <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-sm ${message.role === 'user'
                                        ? 'bg-blue-600 ring-4 ring-blue-50'
                                        : 'bg-zinc-800 ring-4 ring-zinc-50'
                                        }`}>
                                        {message.role === 'user' ? 'ME' : 'AI'}
                                    </div>

                                    {/* 消息内容 */}
                                    <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className={`rounded-2xl px-5 py-3.5 shadow-sm transition-all ${message.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-tr-none'
                                            : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-100 rounded-tl-none'
                                            }`}>
                                            {message.parts?.map((part, index) => {
                                                if (part.type === 'text') {
                                                    return message.role === 'user' ? (
                                                        <div key={index} className="whitespace-pre-wrap leading-relaxed overflow-hidden break-words">
                                                            {part.text}
                                                        </div>
                                                    ) : (
                                                        /* AI 消息使用 Markdown 渲染 */
                                                        <Markdown key={index} content={part.text} />
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>
                                        {/* 时间信息（可选） */}
                                        <span className="text-[10px] text-zinc-400 mt-1.5 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} className="h-4" />
                </div>
            </div>

            {/* 输入区域 */}
            <div className='bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 p-4 pb-6'>
                <div className='max-w-4xl mx-auto'>
                    <div className='relative flex items-end gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all border border-transparent focus-within:border-blue-500/50'>
                        <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder='在此输入您的问题...'
                            className='flex-1 min-h-[52px] max-h-[200px] resize-none border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 py-3 px-3 overflow-y-auto scrollbar-none text-zinc-100'
                        />
                        <Button
                            onClick={() => {
                                if (input.trim()) {
                                    sendMessage({ text: input });
                                }
                            }}
                            disabled={!input.trim()}
                            className='h-10 w-10 p-0 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all shrink-0 mb-1'
                        >
                            <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M5 12h14M12 5l7 7-7 7' />
                            </svg>
                        </Button>
                    </div>
                    <p className='text-center text-[10px] text-zinc-400 mt-3'>
                        AI 可能会产生不准确的信息，请核实重要内容。
                    </p>
                </div>
            </div>
        </div>
    );
}
