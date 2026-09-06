#!/usr/bin/env node
// Pulls recent posts from BGL's Facebook Page (Graph API) and turns them
// into portfolio project entries at src/data/projects.generated.json.
//
// Requires two env vars (set as GitHub Actions secrets, or in your shell
// for a local run):
//   FB_PAGE_ID            - the numeric Facebook Page ID
//   FB_PAGE_ACCESS_TOKEN   - a long-lived Page Access Token with pages_read_engagement
//
// Run locally with:
//   FB_PAGE_ID=xxx FB_PAGE_ACCESS_TOKEN=xxx node scripts/sync-fb-projects.mjs
//
// HOW CATEGORY / LOCATION ARE GUESSED (heuristic, not exact):
// - Category: matches each post's message text against the known service
//   category names (Ceiling & Electrical, Paint, Tiles, etc.) case-insensitively.
//   Posts that don't mention any known category are skipped.
// - Location: BGL operates from two hubs (Seremban office, KL/Pandan Indah
//   showroom) — the script looks for "seremban" / "kl" / "kuala lumpur" /
//   "pandan" in the post text and pins the project to that hub's
//   coordinates. If neither is mentioned, it defaults to Seremban.
//   This is approximate — for real per-project addresses, either write them
//   into the Facebook caption in a parseable way (e.g. a line starting with
//   "Location:"), or maintain lat/lng by hand afterward in the generated file.

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, "../src/data/projects.generated.json");

const FB_PAGE_ID = process.env.FB_PAGE_ID;
const FB_PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

const CATEGORIES = [
  "Ceiling & Electrical",
  "Paint",
  "PS/PU Panel",
  "Tiles",
  "Flooring",
  "Polish",
  "Cabinet",
  "Curtain",
  "Aluminum",
];

const HUBS = {
  seremban: { lat: 2.7297, lng: 101.9381, address: "Seremban, N.S." },
  kl: { lat: 3.1339, lng: 101.7422, address: "Pandan Indah, KL" },
};

function guessCategory(text = "") {
  const lower = text.toLowerCase();
  for (const cat of CATEGORIES) {
    if (lower.includes(cat.toLowerCase()) || lower.includes(cat.split(" ")[0].toLowerCase())) {
      return cat;
    }
  }
  return null;
}

function guessHub(text = "") {
  const lower = text.toLowerCase();
  if (lower.includes("kl") || lower.includes("kuala lumpur") || lower.includes("pandan")) return HUBS.kl;
  return HUBS.seremban; // default hub
}

async function fetchPosts() {
  const fields = "id,message,created_time,full_picture,permalink_url";
  const url = `https://graph.facebook.com/v19.0/${FB_PAGE_ID}/posts?fields=${fields}&limit=100&access_token=${FB_PAGE_ACCESS_TOKEN}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.error) {
    throw new Error(`Facebook Graph API error: ${data.error.message}`);
  }
  return data.data || [];
}

async function main() {
  if (!FB_PAGE_ID || !FB_PAGE_ACCESS_TOKEN) {
    console.error("Missing FB_PAGE_ID or FB_PAGE_ACCESS_TOKEN env vars — skipping sync.");
    process.exit(1);
  }

  const posts = await fetchPosts();
  const projects = [];

  for (const post of posts) {
    const category = guessCategory(post.message);
    if (!category) continue; // skip posts that aren't about a known service
    if (!post.full_picture) continue; // need a photo for the portfolio grid

    const hub = guessHub(post.message);
    projects.push({
      id: post.id,
      title: (post.message || category).split("\n")[0].slice(0, 80),
      category,
      lat: hub.lat,
      lng: hub.lng,
      address: hub.address,
      date: post.created_time?.slice(0, 10),
      image: post.full_picture,
      permalink: post.permalink_url,
    });
  }

  const output = { syncedAt: new Date().toISOString(), projects };
  await writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2) + "\n", "utf-8");
  console.log(`Wrote ${projects.length} projects to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
