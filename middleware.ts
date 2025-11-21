import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("x-url", req.url);
  return res;
}

export const config = {
  matcher: "/cmd/:path*",
};
