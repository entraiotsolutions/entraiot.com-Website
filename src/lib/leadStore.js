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
    // if file is corrupt or unreadable, start fresh
    data = [];
  }

  data.push(lead);

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("saveLead error:", err);
  }
}

export default { saveLead };
