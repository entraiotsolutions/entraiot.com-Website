import { NextResponse } from "next/server";
import { getLeads } from "@/lib/leadStore";

export async function GET() {
  try {
    const leads = getLeads();
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}
