import React from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex min-h-screen bg-gray-50">
            {/* 侧边栏布局 - 与营销页完全不同 */}
            <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-blue-400 font-mono tracking-tighter cursor-pointer">CONSOLE</h2>
                </div>
                <nav className="space-y-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Main Menu</div>
                    <a href="/" className="block p-2 hover:bg-slate-800 rounded transition-colors">退出管理页</a>
                    <a href="/users/1" className="block p-2 bg-blue-600 rounded">用户详情</a>
                </nav>
            </aside>

            <main className="flex-grow">
                <header className="h-16 bg-white border-b flex items-center px-8 justify-between">
                    <span className="font-medium text-gray-500">当前位置：用户中心 / 详情展示</span>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </section>
    );
}
