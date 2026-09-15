import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "chat-leads.json");

export function saveLead(lead) {
  let data = [];

  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8") || "[]";
      data = JSON.parse(raw);
    }
  } catch (err) {
    data = [];
  }

  const now = new Date().toISOString();
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;

  // Deduplication logic
  const existingIndex = data.findIndex(l => {
    const created = new Date(l.created_at || l.timestamp).getTime();
    if (created < oneDayAgo) return false;
    return (
      (lead.email && l.email === lead.email) ||
      (lead.phone && l.phone === lead.phone)
    );
  });

  if (existingIndex !== -1) {
    // Update existing
    data[existingIndex] = {
      ...data[existingIndex],
      ...lead,
      updated_at: now
    };
  } else {
    // Add new
    const newLead = {
      id: lead.id || `lead_${Date.now()}`,
      ...lead,
      created_at: lead.timestamp || now,
      updated_at: now
    };
    data.push(newLead);
  }

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("saveLead error:", err);
  }
}

export function getLeads() {
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8") || "[]";
      return JSON.parse(raw).reverse(); // Newest first
    }
  } catch (err) {
    return [];
  }
  return [];
}

export default { saveLead, getLeads };
