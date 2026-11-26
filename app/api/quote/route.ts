import { NextRequest, NextResponse } from "next/server";

const QUOTE_API_URL = process.env.QUOTE_API_URL || "http://185.206.170.228:5355";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const res = await fetch(`${QUOTE_API_URL}/quote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.ok ? 200 : res.status });
  } catch (error) {
    const message = error instanceof Error ? error.message : "خطا در ارتباط با موتور قیمت‌دهی";
    return NextResponse.json(
      { ok: false, route: "human", message },
      { status: 502 }
    );
  }
}
