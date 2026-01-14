import Link from "next/link";

const Users = () => {
    return (
        <div>
            <h1>用户列表</h1>
            <ul>
                <li><Link href="/users/1">用户1</Link></li>
                <li><Link href="/users/2">用户2</Link></li>
                <li><Link href="/users/3">用户3</Link></li>
            </ul>
        </div>
    );
};

export default Users