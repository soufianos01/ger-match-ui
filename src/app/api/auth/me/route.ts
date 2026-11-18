import { NextRequest, NextResponse } from "next/server";
import { backendUrl, clearSession, messageFor, readPayload, SESSION_COOKIE, unavailableResponse } from "../auth-backend";

export const runtime = "nodejs";

async function forward(request: NextRequest, method: "GET" | "PATCH") {
  const url = backendUrl("/auth/me");
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return NextResponse.json({ message: "Sign in to continue." }, { status: 401 });
  if (!url) return unavailableResponse();

  try {
    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(method === "PATCH" ? { "Content-Type": "application/json" } : {}),
      },
      ...(method === "PATCH" ? { body: JSON.stringify(await request.json().catch(() => null)) } : {}),
      cache: "no-store",
    });
    const payload = await readPayload(response);
    if (!response.ok) {
      const result = NextResponse.json({ message: messageFor(payload, "We could not retrieve your account.") }, { status: response.status });
      return response.status === 401 ? clearSession(result) : result;
    }
    return NextResponse.json(payload);
  } catch {
    return unavailableResponse();
  }
}

export function GET(request: NextRequest) {
  return forward(request, "GET");
}

export function PATCH(request: NextRequest) {
  return forward(request, "PATCH");
}
