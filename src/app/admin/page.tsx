import fs from "fs";
import path from "path";
import React from "react";

export default function AdminPage() {
  const filePath = path.join(process.cwd(), "chat-leads.json");

  let leads = [];

  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8") || "[]";
      leads = JSON.parse(raw);
    }
  } catch (err) {
    console.error("admin read leads error:", err);
    leads = [];
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 Chatbot Leads</h1>

      {leads.length === 0 && <p>No leads yet.</p>}

      {leads.map((lead: any, index: number) => (
        <div key={index} style={{ marginBottom: 10 }}>
          <p>Email: {lead.email}</p>
          <p>Intent: {lead.intent}</p>
          <p>Time: {lead.time || lead.createdAt}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
