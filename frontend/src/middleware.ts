import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("auth-storage")?.value;

  const protectedRoutes = ["/dashboard", "/profile"];

  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/profile"],
};
