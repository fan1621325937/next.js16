import React from 'react';

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="min-h-screen flex flex-col">
            {/* 营销页特有的导航栏 */}
            <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg">
                <h1 className="text-xl font-bold">Brand Logo</h1>
                <div className="space-x-4">
                    <a href="/" className="hover:underline">首页</a>
                    <a href="/about" className="hover:underline">关于</a>
                    <a href="/users/1" className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium">进入控制台</a>
                </div>
            </nav>

            <main className="flex-grow p-8">
                {children}
            </main>

            <footer className="bg-gray-100 p-4 text-center text-gray-500 text-sm">
                © 2024 Next.js 学习案例 - Marketing Group
            </footer>
        </section>
    );
}
