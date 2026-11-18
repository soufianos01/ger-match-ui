import { NextResponse } from "next/server";
import { backendUrl, messageFor, readPayload, SESSION_COOKIE, unavailableResponse } from "../auth-backend";

export const runtime = "nodejs";

type SessionPayload = { token: string; expiresIn: number; user: unknown };

export async function POST(request: Request) {
  const url = backendUrl("/auth/login");
  if (!url) return unavailableResponse();

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ message: "Enter your email address and password." }, { status: 400 });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const payload = await readPayload(response);
    if (!response.ok) return NextResponse.json({ message: messageFor(payload, "We could not sign you in.") }, { status: response.status });

    const session = payload as SessionPayload;
    if (!session.token || !session.user || !Number.isFinite(session.expiresIn)) {
      return NextResponse.json({ message: "GerMatch returned an invalid sign-in response." }, { status: 502 });
    }
    const result = NextResponse.json({ user: session.user });
    result.cookies.set(SESSION_COOKIE, session.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: session.expiresIn,
    });
    return result;
  } catch {
    return unavailableResponse();
  }
}
