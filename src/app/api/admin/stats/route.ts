import { NextResponse } from "next/server";
import { getAllSessions } from "@/lib/chatStore";

export async function GET() {
  try {
    const sessions = getAllSessions();
    
    // 1. Basic Stats
    const totalSessions = sessions.length;
    const leads = sessions.filter(s => !!s.email || !!s.name);
    const totalLeads = leads.length;
    
    // Conversion Rate
    const conversionRate = totalSessions > 0 ? ((totalLeads / totalSessions) * 100).toFixed(1) : 0;
    
    // Active Chats (last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const activeChats = sessions.filter(s => new Date(s.lastActive) > oneDayAgo).length;

    // 2. Leads Per Day (last 7 days)
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    const leadsPerDay = last7Days.map(date => {
      const count = sessions.filter(s => 
        s.lastActive.startsWith(date) && (s.email || s.name)
      ).length;
      return { date: date.split('-').slice(1).join('/'), count };
    });

    // 3. Intent Distribution
    const intentMap: Record<string, number> = {};
    sessions.forEach(s => {
      if (s.intent) {
        intentMap[s.intent] = (intentMap[s.intent] || 0) + 1;
      } else {
        intentMap["Unknown"] = (intentMap["Unknown"] || 0) + 1;
      }
    });

    const intentDistribution = Object.entries(intentMap).map(([name, value]) => ({ name, value }));

    return NextResponse.json({
      totalSessions,
      totalLeads,
      conversionRate,
      activeChats,
      leadsPerDay,
      intentDistribution,
      avgResponseTime: "1.2s" // Simulated for now
    });
  } catch (error) {
    console.error("Stats API Error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
