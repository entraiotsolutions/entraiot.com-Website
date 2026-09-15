"use client";

import { Inbox, Users } from "lucide-react";
import UserList from "@/components/admin/UserList";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#F3F4F6] text-slate-900 font-sans overflow-hidden">
      {/* Sidebar - Navigation */}
      <aside className="w-16 flex flex-col items-center py-6 bg-indigo-900 text-white gap-8 border-r border-indigo-950 flex-shrink-0">
        <Link href="/admin" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center font-bold text-xl hover:bg-white/20 transition-all shadow-inner">E</Link>
        <div className="flex flex-col gap-4">
          <Link 
            href="/admin" 
            className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
            title="Inbox"
          >
            <Inbox size={20} />
          </Link>
          <button 
            className="w-10 h-10 hover:bg-white/10 rounded-xl flex items-center justify-center transition-colors text-indigo-300 hover:text-white"
            title="Users"
          >
            <Users size={20} />
          </button>
        </div>
      </aside>

      {/* User List Panel */}
      <UserList />

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}</style>
    </div>
  );
}
