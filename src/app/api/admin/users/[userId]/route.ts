import { NextRequest, NextResponse } from "next/server";
import { getAllSessions } from "@/lib/chatStore";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const users = getAllSessions();
    const user = users.find(u => u.userId === userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
