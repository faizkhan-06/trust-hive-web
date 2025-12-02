import { NextRequest, NextResponse } from "next/server";
import { CMI_TOKEN } from "./configs/constants";
import userStore from "./stores/UserStore";

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const cmiToken = req.cookies.get(CMI_TOKEN)?.value;

  const isAuthPage =
    pathname === "/cmi/login" ||
    pathname === "/cmi/login/" ||
    pathname === "/cmi/register" ||
    pathname === "/cmi/register/";

  
  // 1️⃣ If logged in → block login/register → redirect to dashboard
  if (cmiToken && isAuthPage) {
    return NextResponse.redirect(new URL("/cmi/dashboard", req.url));
  }

  // 2️⃣ Redirect root /cmi → login or dashboard
  if (pathname === "/cmi" || pathname === "/cmi/") {
    if (cmiToken) {
      return NextResponse.redirect(new URL("/cmi/dashboard", req.url));
    } else {
      return NextResponse.redirect(new URL("/cmi/login", req.url));
    }
  }

  // 3️⃣ Protect private pages except login/register
  const isProtectedPath =
    pathname.startsWith("/cmi") && !isAuthPage;

  if (isProtectedPath && !cmiToken) {
    return NextResponse.redirect(new URL("/cmi/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cmi/:path*"],
};
