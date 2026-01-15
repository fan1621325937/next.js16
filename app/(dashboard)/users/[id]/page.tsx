import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, Mail, ShieldCheck, User as UserIcon } from 'lucide-react';
import Counter from '@/components/Counter';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

async function getUser(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
        id,
        name: `用户_${id}`,
        email: `user${id}@example.com`,
        role: id === '1' ? '管理员' : '普通成员',
    };
}

export async function generateMetadata({
    params
}: {
    params: Promise<{ id: string }>
}): Promise<Metadata> {
    const { id } = await params;
    const user = await getUser(id);
    return {
        title: `${user.name} - 用户详情`,
        description: `查看 ${user.name} 的基本资料和操作权限`,
    };
}

export default async function UserDetailPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const user = await getUser(id);

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 p-8">
            <nav className="flex items-center gap-4">
                <Button variant="ghost" size="sm" asChild className="-ml-2">
                    <Link href="/users">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        返回列表
                    </Link>
                </Button>
            </nav>

            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
                        <UserIcon className="h-8 w-8 text-primary" />
                        {user.name}
                    </h2>
                    <p className="text-muted-foreground">
                        此页面由服务器直接渲染 (Server Component)，当前访问 ID: <code className="bg-muted px-1 rounded">{user.id}</code>
                    </p>
                </div>
                <Badge variant={user.role === '管理员' ? 'default' : 'secondary'} className="px-3 py-1 text-sm font-bold uppercase tracking-wider">
                    {user.role}
                </Badge>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-card text-card-foreground p-8 rounded-2xl shadow-sm border border-border/50 space-y-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <ShieldCheck className="h-32 w-32" />
                    </div>

                    <h3 className="text-xl font-bold border-b border-border pb-4 flex items-center gap-2">
                        基本资料
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                        <div className="space-y-1">
                            <span className="text-xs font-medium text-muted-foreground uppercase">用户标识</span>
                            <p className="text-lg font-semibold">{user.id}</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs font-medium text-muted-foreground uppercase flex items-center gap-1">
                                <Mail className="h-3 w-3" /> 电子邮箱
                            </span>
                            <p className="text-lg font-semibold">{user.email}</p>
                        </div>
                    </div>

                    <div className="pt-6 text-xs text-muted-foreground bg-muted/30 p-4 rounded-xl italic">
                        💡 <strong>开发提示：</strong> 注意这里的异步请求是直接在服务器执行的，客户端浏览器控制台不会看到任何 API 请求记录，增强了数据安全性和首屏性能。
                    </div>
                </div>

                <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="space-y-2">
                        <h4 className="font-bold text-primary">交互性演示</h4>
                        <p className="text-sm text-muted-foreground px-4">
                            下面的计数器是一个<strong>客户端组件 (Client Component)</strong>，它被嵌入在这个服务端页面中。
                        </p>
                    </div>
                    <div className="bg-background p-6 rounded-xl shadow-sm w-full">
                        <Counter />
                    </div>
                </div>
            </div>
        </div>
    );
}
