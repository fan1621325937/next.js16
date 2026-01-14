import React from 'react';

export default function HomePage() {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
                欢迎来到 Next.js 路由分组演示
            </h2>
            <p className="text-lg text-gray-600">
                你现在看到的是 <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded">(marketing)</code> 分组下的页面。
                请注意你的浏览器地址栏：它是 <span className="font-mono font-bold">/</span> 而不是 <span className="font-mono font-bold">/(marketing)</span>。
            </p>
            <div className="grid grid-cols-2 gap-4">
                <div className="border p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-lg mb-2">路由分组 🚀</h3>
                    <p className="text-sm text-gray-500">使用括号组织代码，保持 URL 简洁。</p>
                </div>
                <div className="border p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-lg mb-2">共享布局 🎨</h3>
                    <p className="text-sm text-gray-500">仅在同一分组内的页面共享该特定布局。</p>
                </div>
            </div>
        </div>
    );
}
