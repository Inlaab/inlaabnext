import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const host     = req.headers.get("host") ?? "";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const res      = NextResponse.redirect(new URL("/metryca", `${protocol}://${host}`));
  res.cookies.set("metryca_session", "", { maxAge: 0, path: "/" });
  return res;
}
