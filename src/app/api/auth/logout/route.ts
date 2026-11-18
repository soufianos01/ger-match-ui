import { NextResponse } from "next/server";
import { clearSession } from "../auth-backend";

export const runtime = "nodejs";

export function POST() {
  return clearSession(NextResponse.json({ ok: true }));
}
