import {NextRequest, NextResponse} from "next/server";

export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;
  if (pathname === "/1") {const url=request.nextUrl.clone();url.pathname="/legacy";return NextResponse.rewrite(url);}
  if (pathname.startsWith("/1/")) {const url=request.nextUrl.clone();url.pathname=pathname.slice(2);return NextResponse.rewrite(url);}
  return NextResponse.next();
}

export const config = {matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]};
