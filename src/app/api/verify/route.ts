import { NextResponse } from "next/server";
import { createToken } from "@/lib/token";

export async function POST(req: Request) {
  const { code } = await req.json();

  const expected = process.env.ACCESS_CODE;
  const secret   = process.env.JWT_SECRET;

  if (!expected || !secret) {
    return NextResponse.json({ error: "Configuración incompleta" }, { status: 500 });
  }

  if (!code || code.trim().toUpperCase() !== expected.trim().toUpperCase()) {
    return NextResponse.json({ error: "Código incorrecto" }, { status: 401 });
  }

  const token = await createToken(secret);

  const res = NextResponse.json({ ok: true });
  res.cookies.set("metryca_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 86_400,
    path: "/",
  });

  return res;
}
