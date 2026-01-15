import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

/**
 * 404 页面组件
 * 采用现代化的设计语言，结合 Tailwind CSS v4 的动画和渐变特性。
 * 已优化：集成 Shadcn UI 组件以保持设计系统一致性。
 */
export default function NotFound() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
            {/* 装饰性背景元素 - 动态渐变球 */}
            <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px] animate-pulse delay-700" />

            <main className="relative z-10 flex flex-col items-center px-6 text-center">
                {/* 指示 404 的大数字，带有浮动动画 */}
                <div className="relative mb-8 select-none">
                    <h1 className="animate-bounce-slow text-[12rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 opacity-20 dark:opacity-30 sm:text-[18rem]">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                            页面失踪了
                        </span>
                    </div>
                </div>

                {/* 提示信息卡片 */}
                <div className="max-w-md space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl transition-all hover:bg-white/10 dark:bg-black/10 dark:hover:bg-black/20">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        抱歉，您访问的页面可能已被移动、删除或从未存在。
                        <br />
                        别担心，我们的 AI 已经记录了这次迷失。
                    </p>

                    <div className="flex flex-col gap-4 justify-center sm:flex-row">
                        <Button asChild size="lg" className="rounded-full px-8 shadow-lg hover:scale-105 transition-transform">
                            <Link href="/">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                返回首页
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* 底部装饰 */}
                <div className="mt-12 flex items-center gap-2 text-sm text-foreground/40">
                    <div className="h-1 w-1 rounded-full bg-current" />
                    <span>Antigravity Design System</span>
                    <div className="h-1 w-1 rounded-full bg-current" />
                </div>
            </main>

            {/* 注入自定义动画样式 */}
            <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(-5%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
      `}</style>
        </div>
    );
}
