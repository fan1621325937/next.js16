import React from 'react';
import Counter from '../../../../components/Counter';
// 模拟异步获取数据函数
async function getUser(id: string) {
    // 增加延迟到 3 秒，方便看清 loading.tsx 的效果
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return {
        id,
        name: `用户_${id}`,
        email: `user${id}@example.com`,
        role: id === '1' ? '管理员' : '普通成员',
    };
}

// 这是一个服务端组件 (默认为 Server Component)
// 我们可以直接在函数前加 async
export default async function UserDetailPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const user = await getUser(id);

    // 如果你想测试刚写的 error.tsx，可以取消下面这一行的注释：
    // throw new Error("模拟点击报错");

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">{user.name} 的资料卡</h2>
                    <p className="text-gray-500">此页面由服务器直接渲染 (Server Component)</p>
                </div>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                    {user.role}
                </span>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
                    <h3 className="font-bold border-b pb-2">基本信息</h3>
                    <div className="space-y-2 text-sm">
                        <p><span className="text-gray-400">用户 ID:</span> {user.id}</p>
                        <p><span className="text-gray-400">电子邮箱:</span> {user.email}</p>
                    </div>
                    <div className="pt-4 text-xs text-gray-400 italic">
                        提示：注意这里的异步请求是直接在服务器执行的，客户端不会看到 API 请求。
                    </div>
                </div>

                {/* 组合模式：将客户端组件嵌入到服务端组件中 */}
                <Counter />
            </div>
        </div>
    );
}
