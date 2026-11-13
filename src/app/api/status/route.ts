const backendUrl = process.env.GER_MATCH_API_URL;

export async function GET() {
  if (!backendUrl) {
    return Response.json({ status: "unavailable" }, { status: 503 });
  }

  try {
    const response = await fetch(backendUrl, {
      cache: "no-store",
      signal: AbortSignal.timeout(4_000),
    });

    if (!response.ok) {
      return Response.json({ status: "unavailable" }, { status: 502 });
    }

    const payload: unknown = await response.json();
    return Response.json(payload);
  } catch {
    return Response.json({ status: "unavailable" }, { status: 502 });
  }
}
