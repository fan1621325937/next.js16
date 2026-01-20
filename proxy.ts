import { NextResponse, NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // console.log(request, "request");

  // 导航到
  // return NextResponse.redirect(new URL("/users", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/chats:path*"],
};
