import { load } from "cheerio";
import fs from "fs/promises";
import path from "path";

const BASE = "https://entraiot.com";
const PAGES = [
  "/",
  "/about",
  "/contact",
  "/solutions",
  "/services",
  "/industries",
  "/products",
  "/blog",
];

function cleanText(t) {
  return (t || "")
    .replace(/\s+/g, " ")
    .replace(/\u00A0/g, " ")
    .trim();
}

async function fetchPage(url) {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "en-traiot-scraper/1.0 (+https://entraiot.com)" } });
    if (!res.ok) {
      console.warn("Failed to fetch", url, res.status);
      return null;
    }
    const html = await res.text();
    const $ = load(html);

    const title = cleanText($("h1").first().text() || $("title").text());

    const paragraphs = [];
    $("main p, main li, main h2, main h3, .content p, .content li, p, li, h2, h3").each((i, el) => {
      const t = cleanText($(el).text());
      if (t && t.length > 20) paragraphs.push(t);
    });

    const text = paragraphs.join("\n\n");

    const headings = [];
    $("h1, h2, h3").each((i, el) => {
      const t = cleanText($(el).text());
      if (t) headings.push(t);
    });

    const keywords = Array.from(new Set(
      headings
        .join(" ")
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((s) => s.length > 3)
    ));

    return {
      url,
      title,
      text,
      headings,
      keywords,
    };
  } catch (err) {
    console.error("Error fetching page", url, err.message);
    return null;
  }
}

async function run() {
  const results = [];
  for (const p of PAGES) {
    const url = new URL(p, BASE).toString();
    console.log("Fetching", url);
    const data = await fetchPage(url);
    if (data) results.push(data);
    // small delay
    await new Promise((r) => setTimeout(r, 500));
  }

  const outPath = path.join(process.cwd(), "src", "lib", "knowledge.json");
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, JSON.stringify(results, null, 2), "utf8");
  console.log("Wrote knowledge base to", outPath);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
