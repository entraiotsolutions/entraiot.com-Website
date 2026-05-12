"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  ArrowUpRight,
  Loader2
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";

interface Stats {
  totalSessions: number;
  totalLeads: number;
  conversionRate: string;
  activeChats: number;
  avgResponseTime: string;
  leadsPerDay: { date: string; count: number }[];
  intentDistribution: { name: string; value: number }[];
}

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function AdminAnalytics() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Fetch stats error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  if (loading && !stats) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50 h-full">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="flex-1 bg-slate-50 overflow-y-auto p-8 h-full custom-scrollbar">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 text-sm">Real-time performance metrics for your AI assistant.</p>
      </header>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Leads" 
          value={stats.totalLeads} 
          icon={<Users className="text-indigo-600" size={20} />} 
          trend="+12%"
          color="bg-indigo-50"
        />
        <StatCard 
          title="Active Chats" 
          value={stats.activeChats} 
          icon={<MessageSquare className="text-emerald-600" size={20} />} 
          trend="Live"
          color="bg-emerald-50"
        />
        <StatCard 
          title="Conversion Rate" 
          value={`${stats.conversionRate}%`} 
          icon={<TrendingUp className="text-amber-600" size={20} />} 
          trend="+2.4%"
          color="bg-amber-50"
        />
        <StatCard 
          title="Avg Response" 
          value={stats.avgResponseTime} 
          icon={<Clock className="text-rose-600" size={20} />} 
          trend="Stable"
          color="bg-rose-50"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Line Chart: Leads per Day */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Leads Acquisition</h3>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full uppercase">Last 7 Days</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.leadsPerDay}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#6366f1" 
                  strokeWidth={4} 
                  dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Intent Distribution */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Intent Distribution</h3>
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.intentDistribution}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.intentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2 ml-4">
               {stats.intentDistribution.map((item, i) => (
                 <div key={i} className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                   <span className="text-xs text-slate-600 font-medium">{item.name}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart or List Section */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
         <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-slate-800">Engagement Metrics</h3>
              <p className="text-xs text-slate-500">Interaction depth per user segment.</p>
            </div>
            <button className="text-xs font-bold text-indigo-600 hover:underline">View Detailed Report</button>
         </div>
         <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={stats.leadsPerDay.map(d => ({ ...d, sessions: d.count * 1.5 }))}>
                  <Bar dataKey="sessions" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Tooltip cursor={{fill: 'transparent'}} />
               </BarChart>
            </ResponsiveContainer>
         </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, color }: { title: string, value: string | number, icon: React.ReactNode, trend: string, color: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${color} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${trend.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
          {trend}
        </span>
      </div>
      <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">{title}</p>
      <h4 className="text-2xl font-black text-slate-900">{value}</h4>
    </div>
  );
}
