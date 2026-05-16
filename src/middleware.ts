import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/token";

export const config = {
  matcher: ["/", "/metryca/tours/:path*"],
};

export async function middleware(req: NextRequest) {
  const host     = req.headers.get("host") ?? "";
  const pathname = req.nextUrl.pathname;
  const isMetrycaHost = host.startsWith("metryca.");

  // metryca.inlaab.com → redirige al login
  if (isMetrycaHost && pathname === "/") {
    return NextResponse.redirect(new URL("/metryca", req.url));
  }

  // Proteger rutas de tours
  if (pathname.startsWith("/metryca/tours")) {
    const token  = req.cookies.get("metryca_session")?.value;
    const secret = process.env.JWT_SECRET ?? "";

    if (!token || !(await verifyToken(token, secret))) {
      const login = new URL("/metryca", req.url);
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
  }

  return NextResponse.next();
}
