import { NextRequest } from "next/server";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth_bg.svg).*)"],
};

export async function middleware(req: NextRequest) {
  console.log(req.nextUrl.pathname);
}
