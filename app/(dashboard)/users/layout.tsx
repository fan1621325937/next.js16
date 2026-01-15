import React from 'react';

/**
 * 用户中心专属布局
 */
export default function UsersLayout({
    children,
    modal,
}: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    return (
        <div className="relative">
            {/* 列表页主内容 */}
            {children}

            {/* 
                弹窗插槽：恢复为标准渲染模式。
                由于我们已经在 Link 中禁用了 prefetch，拦截逻辑会更加稳定。
            */}
            {modal}
        </div>
    );
}
