import React from 'react';
import UserModal from '@/components/UserModal';
import { Mail, ShieldCheck, User as UserIcon } from 'lucide-react';
import Counter from '@/components/Counter';
import { Badge } from '@/components/ui/badge';
import {
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

// 复用数据获取逻辑
async function getUser(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 800)); // 弹窗中稍微快一点
    return {
        id,
        name: `用户_${id}`,
        email: `user${id}@example.com`,
        role: id === '1' ? '管理员' : '普通成员',
        bio: "这是一个正在学习 Next.js 平行路由的高级用户，他非常关注用户体验与交互设计。"
    };
}

/**
 * 拦截路由：当从 /users 点击进入 /users/[id] 时
 * Next.js 会通过此插槽在当前页面弹出模态框
 */
export default async function UserInterceptionPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const user = await getUser(id);

    return (
        <UserModal>
            <div className="p-8 space-y-8 animate-in zoom-in-95 duration-300">
                <DialogHeader className="sr-only">
                    <DialogTitle>{user.name} 的基本资料</DialogTitle>
                    <DialogDescription>
                        查看用户 {user.name} 的详细信息及其在系统中的权限分配。
                    </DialogDescription>
                </DialogHeader>

                {/* 弹窗头部 */}
                <header className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <UserIcon className="h-8 w-8" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-bold">{user.name}</h2>
                            <Badge variant={user.role === '管理员' ? 'default' : 'secondary'}>
                                {user.role}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Mail className="h-3 w-3" /> {user.email}
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 左侧详情 */}
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-muted/30 border space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">用户简介</h4>
                            <p className="text-sm leading-relaxed italic">"{user.bio}"</p>
                        </div>

                        <div className="flex items-center gap-3 p-4 rounded-xl border border-primary/20 bg-primary/5">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            <div className="text-xs">
                                <p className="font-bold text-primary">平行路由拦截生效</p>
                                <p className="text-primary/70">当前页面 URL 已更新，但列表状态完整保留</p>
                            </div>
                        </div>
                    </div>

                    {/* 右侧交互演示 */}
                    <div className="flex flex-col items-center justify-center border-l pl-8 border-border/50">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground mb-4">组件内嵌测试</p>
                        <div className="scale-90 transform origin-top">
                            <Counter />
                        </div>
                    </div>
                </div>

                <footer className="pt-4 border-t text-[10px] text-muted-foreground text-center">
                    提示：你可以通过点击蒙版、关闭按钮或按 ESC 键返回列表页。
                </footer>
            </div>
        </UserModal>
    );
}
