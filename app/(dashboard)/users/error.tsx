'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center">
            <h2 className="text-2xl font-bold text-red-600">抱歉，加载过程中出错了</h2>
            <p className="text-muted-foreground max-w-md">
                这可能是一个临时的网络问题或服务器内部错误。
            </p>
            <Button onClick={() => reset()} variant="outline">
                重试一下
            </Button>
        </div>
    );
}
