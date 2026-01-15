import React from 'react';

export default function UsersLoading() {
    return (
        <div className="w-full space-y-4 animate-pulse p-8">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-4">
                        <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                        <div className="flex-1 space-y-2 py-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-sm text-blue-500 font-medium pt-4">数据拼命加载中 (由 loading.tsx 自动处理)...</p>
        </div>
    );
}
