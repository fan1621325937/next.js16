'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { X } from 'lucide-react';

/**
 * 路由弹窗容器
 * 当弹窗关闭时，自动返回上一级路由 (通常是列表页)
 */
export default function UserModal({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            router.back();
        }
    };

    if (!mounted) return null;

    return (
        <Dialog open onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-transparent border-none shadow-none ring-0 focus:outline-none">
                {/* 内部渲染详情内容 */}
                <div className="bg-background rounded-2xl border shadow-2xl relative">
                    {children}

                    {/* 自定义关闭按钮位置与样式 */}
                    <button
                        onClick={() => router.back()}
                        className="absolute right-6 top-6 rounded-full p-2 hover:bg-muted transition-colors z-50 text-muted-foreground outline-none"
                    >
                        <X className="h-5 w-5" />
                        <span className="sr-only">关闭</span>
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
