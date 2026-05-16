import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const origin = new URL(req.url).origin;
  const res = NextResponse.redirect(new URL("/metryca", origin));
  res.cookies.set("metryca_session", "", { maxAge: 0, path: "/" });
  return res;
}
