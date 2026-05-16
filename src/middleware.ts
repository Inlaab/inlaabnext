import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/token";

export const config = {
  matcher: ["/metryca/tours/:path*"],
};

export async function middleware(req: NextRequest) {
  const token  = req.cookies.get("metryca_session")?.value;
  const secret = process.env.JWT_SECRET ?? "";

  if (!token || !(await verifyToken(token, secret))) {
    const login = new URL("/metryca", req.url);
    login.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}
