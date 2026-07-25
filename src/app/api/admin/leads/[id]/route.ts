import { NextResponse } from "next/server";
import { deleteLead, getLead, updateLead } from "@/actions/admin/leads";
import { getOptionalStaff } from "@/lib/admin/auth";

interface RouteContext {
  params: { id: string };
}

export async function GET(_request: Request, { params }: RouteContext) {
  const session = await getOptionalStaff();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const result = await getLead(params.id);
  return NextResponse.json(result, { status: result.success ? 200 : 404 });
}

export async function PUT(request: Request, { params }: RouteContext) {
  const session = await getOptionalStaff();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const result = await updateLead({ ...body, id: params.id });
  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const session = await getOptionalStaff();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const result = await deleteLead(params.id);
  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}
