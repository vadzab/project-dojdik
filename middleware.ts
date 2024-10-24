import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    (pathname === "/login" || pathname === "/register") &&
    request.cookies.has("userAuth")
  )
    return NextResponse.redirect(new URL("/", request.url));

  if (
    (pathname === "/" || pathname === "/accounts") &&
    !request.cookies.has("userAuth")
  )
    return NextResponse.redirect(new URL("/login", request.url));

  return NextResponse.next();
}
