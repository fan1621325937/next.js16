"use client";
import React, { useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div className="bg-white p-6 rounded-lg border-2 border-dashed border-blue-200 text-center">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
                客户端组件演示 (use client)
            </h4>
            <p className="text-3xl font-mono font-bold text-blue-600 mb-6">{count}</p>
            <div className="space-x-4">
                <button
                    onClick={() => setCount(count - 1)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                    - 减少
                </button>
                <button
                    onClick={() => setCount(count + 1)}
                    className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md shadow-md transition-colors"
                >
                    + 增加
                </button>
            </div>
            <p className="mt-4 text-xs text-gray-500">
                该计数器代码在浏览器中运行，支持 React 状态 Hooks。
            </p>
        </div>
    );
}
