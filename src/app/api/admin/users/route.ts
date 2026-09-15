import { NextResponse } from "next/server";
import { getAllSessions } from "@/lib/chatStore";

export async function GET() {
  try {
    const users = getAllSessions();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
