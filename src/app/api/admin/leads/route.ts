import { NextResponse } from "next/server";
import { createLead, listLeads } from "@/actions/admin/leads";
import { getOptionalStaff } from "@/lib/admin/auth";

export async function GET(request: Request) {
  const session = await getOptionalStaff();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const result = await listLeads({
    status: searchParams.get("status") ?? undefined,
    priority: searchParams.get("priority") ?? undefined,
    source: searchParams.get("source") ?? undefined,
    search: searchParams.get("search") ?? undefined,
    limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined,
  });

  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}

export async function POST(request: Request) {
  const session = await getOptionalStaff();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const result = await createLead(body);
  return NextResponse.json(result, { status: result.success ? 201 : 400 });
}
