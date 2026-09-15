import { NextResponse } from "next/server";
import { getAllSessions } from "@/lib/chatStore";

export async function GET() {
  try {
    const chats = getAllSessions();
    return NextResponse.json(chats);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch chats" }, { status: 500 });
  }
}
