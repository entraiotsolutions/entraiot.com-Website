"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { 
  User as UserIcon, 
  Mail, 
  Target, 
  Clock,
  MoreVertical,
  ChevronLeft,
  Loader2,
  TrendingUp,
  MessageSquare
} from "lucide-react";
import Link from "next/link";

interface ChatMessage {
  role: "user" | "bot";
  text: string;
  time: string;
}

interface UserSession {
  userId: string;
  email?: string;
  name?: string;
  intent?: string;
  businessType?: string;
  score: number;
  leadLabel: "Cold" | "Warm" | "Hot";
  lastActive: string;
  messages: ChatMessage[];
}

export default function UserDetailPage() {
  const params = useParams();
  const userId = params.userId as string;
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (error) {
      console.error("Fetch user error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    // Auto-refresh this user's data
    const interval = setInterval(fetchUser, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [user]);

  if (loading && !user) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white h-full">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white h-full">
        <h2 className="text-xl font-bold text-slate-900">User not found</h2>
        <Link href="/admin" className="text-indigo-600 hover:underline mt-2">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <section className="flex-1 flex flex-col bg-white h-full animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Chat Header */}
      <header className="p-4 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="md:hidden p-2 -ml-2 hover:bg-slate-50 rounded-lg text-slate-400">
            <ChevronLeft size={20} />
          </Link>
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
            {user.email ? user.email.charAt(0).toUpperCase() : <UserIcon size={20} />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">
                {user.name ? `${user.name} (${user.email || "No Email"})` : (user.email || "Anonymous Visitor")}
              </h2>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                user.leadLabel === "Hot" ? "bg-rose-100 text-rose-700 animate-pulse" : 
                user.leadLabel === "Warm" ? "bg-amber-100 text-amber-700" : 
                "bg-slate-100 text-slate-500"
              }`}>
                {user.leadLabel} {user.leadLabel === "Hot" ? "🔥" : ""}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              ID: {user.userId.substring(0, 12)}... • Score: {user.score}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <div className="hidden md:flex flex-col items-end mr-4">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Detected Intent</span>
             <span className="text-xs font-bold text-indigo-600">{user.intent || "Identifying..."}</span>
           </div>
           <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors"><MoreVertical size={18} /></button>
        </div>
      </header>

      {/* Chat Canvas */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-[#F9FAFB] custom-scrollbar">
        {user.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-300 space-y-2">
             <MessageSquare size={48} className="opacity-20" />
             <p>No messages yet</p>
          </div>
        ) : (
          user.messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] md:max-w-[70%] space-y-1`}>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === "user" 
                    ? "bg-indigo-600 text-white rounded-tr-none" 
                    : "bg-white border border-slate-200 text-slate-700 rounded-tl-none"
                }`}>
                  {msg.text}
                </div>
                <p className={`text-[10px] text-slate-400 font-medium ${msg.role === "user" ? "text-right" : "text-left"}`}>
                  {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Info Footer (SaaS Details) */}
      <footer className="p-6 border-t border-slate-100 bg-white grid grid-cols-1 md:grid-cols-5 gap-6">
         <div className="flex items-center gap-3 group">
           <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-slate-100 transition-colors">
             <UserIcon size={18} />
           </div>
           <div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name</p>
             <p className="text-sm font-semibold text-slate-700 truncate max-w-[120px]">{user.name || "Anonymous"}</p>
           </div>
         </div>
         <div className="flex items-center gap-3 group">
           <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors">
             <Mail size={18} />
           </div>
           <div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
             <p className="text-sm font-semibold text-slate-700 truncate max-w-[120px]">{user.email || "Not provided"}</p>
           </div>
         </div>
         <div className="flex items-center gap-3 group">
           <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
             user.leadLabel === "Hot" ? "bg-rose-50 text-rose-600" : "bg-indigo-50 text-indigo-600"
           }`}>
             <TrendingUp size={18} />
           </div>
           <div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lead Status</p>
             <p className="text-sm font-semibold text-slate-700">{user.leadLabel} ({user.score} pts)</p>
           </div>
         </div>
         <div className="flex items-center gap-3 group">
           <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors">
             <Target size={18} />
           </div>
           <div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">User Intent</p>
             <p className="text-sm font-semibold text-slate-700">{user.intent || "In progress"}</p>
           </div>
         </div>
         <div className="flex items-center gap-3 group">
           <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-100 transition-colors">
             <Clock size={18} />
           </div>
           <div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Interaction</p>
             <p className="text-sm font-semibold text-slate-700">
               {new Date(user.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
             </p>
           </div>
         </div>
      </footer>
    </section>
  );
}
