"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

/**
 * ClientNavButtons 组件
 * 用于演示客户端侧的编程式导航：
 * 1. useRouter Hook
 * 2. History API
 */
export default function ClientNavButtons({ userId }: { userId: number }) {
    const router = useRouter();

    // 使用 useRouter 跳转
    const handleUseRouterNav = () => {
        console.log("Using useRouter to navigate...");
        router.push(`/users/${userId}`);
    };

    // 使用 History API 跳转 (原生浏览器 API)
    const handleHistoryNav = () => {
        console.log("Using History API to navigate...");
        window.history.pushState({}, "", `/users/${userId}`);
        alert("History API 已更新 URL，但 Next.js 内部状态可能未同步，建议生产环境使用 useRouter。");
    };

    return (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <Button
                variant="outline"
                size="sm"
                onClick={handleUseRouterNav}
                className="h-8 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
            >
                useRouter 跳转
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={handleHistoryNav}
                className="h-8 text-xs font-medium text-slate-600 dark:text-slate-400"
            >
                History API
            </Button>
        </div>
    );
}
