import Link from "next/link";
import { redirect } from "next/navigation";
import ClientNavButtons from "@/components/ClientNavButtons";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, UserCircle2 } from "lucide-react";

type User = {
    id: number;
    name: string;
    role: string;
    avatar: string;
};

const users: User[] = [
    { id: 1, name: "张三", role: "前端开发", avatar: "JS" },
    { id: 2, name: "李四", role: "产品经理", avatar: "PM" },
    { id: 3, name: "王五", role: "UI 设计师", avatar: "UI" },
];

export default function Users() {
    async function handleServerRedirect(formData: FormData) {
        "use server";
        const id = formData.get("userId");
        if (id) {
            redirect(`/users/${id}`);
        }
    }

    return (
        <div className="min-h-screen bg-transparent p-8 font-sans">
            <div className="mx-auto max-w-5xl">
                <header className="mb-12 space-y-4 text-center sm:text-left">
                    <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold tracking-wide uppercase">
                        Next.js 路由概览
                    </Badge>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                        用户列表与导航实战
                    </h1>
                    <p className="max-w-2xl text-lg text-muted-foreground">
                        探索 Next.js 提供的不同页面流转方案，掌握每种跳转方式的适用场景与性能权衡。
                    </p>
                </header>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {users.map((user) => (
                        <Link
                            key={user.id}
                            href={`/users/${user.id}`}
                            className="group block"
                            prefetch={false}
                        >
                            <Card className="flex flex-col h-full shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 border-transparent bg-card/50 backdrop-blur-sm">
                                <CardHeader className="flex-row items-center gap-4 space-y-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                                        <UserCircle2 className="h-7 w-7" />
                                    </div>
                                    <div className="flex flex-col">
                                        <CardTitle className="text-lg group-hover:text-primary transition-colors">{user.name}</CardTitle>
                                        <CardDescription className="text-xs">{user.role}</CardDescription>
                                    </div>
                                </CardHeader>

                                <CardContent className="flex-1">
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        点击查看这位 {user.role} 的详细资料并进入交互式管理界面。
                                    </p>
                                </CardContent>

                                <CardFooter className="pt-0 flex justify-between items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    查看详情
                                    <ArrowRight className="h-4 w-4" />
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
