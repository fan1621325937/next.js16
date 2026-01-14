import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Geist用于设置字体
const geistSans = Geist({
  variable: "--font-geist-sans", // 设置变量名
  subsets: ["latin"], // 设置字体子集
});

// Geist_Mono用于设置代码字体
const geistMono = Geist_Mono({
  variable: "--font-geist-mono", // 设置变量名
  subsets: ["latin"], // 设置字体子集
});

// metadata用于设置元数据
export const metadata: Metadata = {
  title: "Next.js", // 设置标题
  description: "用于学习next.js", // 设置描述
};

// RootLayout用于设置布局
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
