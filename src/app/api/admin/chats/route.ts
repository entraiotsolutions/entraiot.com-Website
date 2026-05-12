import { NextResponse } from "next/server";
import { getChats } from "@/lib/chatStore";

export async function GET() {
  try {
    const chats = getChats();
    return NextResponse.json(chats);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch chats" }, { status: 500 });
  }
}
