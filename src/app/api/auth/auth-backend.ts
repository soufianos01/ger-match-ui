import { NextResponse } from "next/server";

export const SESSION_COOKIE = "germatch_session";

type ErrorPayload = { message?: string | string[] };

export function backendUrl(path: string) {
  const baseUrl = process.env.GER_MATCH_API_URL;
  if (!baseUrl) return null;
  return new URL(path, baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`).toString();
}

export async function readPayload(response: Response) {
  return response.json().catch(() => null) as Promise<unknown>;
}

export function messageFor(payload: unknown, fallback: string) {
  const message = (payload as ErrorPayload | null)?.message;
  return Array.isArray(message) ? message[0] ?? fallback : message ?? fallback;
}

export function unavailableResponse() {
  return NextResponse.json({ message: "GerMatch is temporarily unavailable. Please try again shortly." }, { status: 503 });
}

export function clearSession(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}
