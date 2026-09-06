// PLACEHOLDER project data — demo entries with approximate coordinates
// around Seremban and Kuala Lumpur (Pandan Indah), just to show the map +
// grid working end to end. Once the Facebook sync (see
// scripts/sync-fb-projects.mjs + .github/workflows/sync-projects.yml) is
// configured with real credentials, this file gets replaced by
// src/data/projects.generated.json — see projects.js for how that's wired in.

export const CATEGORIES = [
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

export const placeholderProjects = [
  { id: "p1", title: "Seremban Landed - Ceiling & Electrical", category: "Ceiling & Electrical", lat: 2.7297, lng: 101.9381, address: "Seremban, N.S.", date: "2025-03-12", image: "/assets/images/Ceiling/c1.jpeg" },
  { id: "p2", title: "Pandan Indah Condo - Full Paint", category: "Paint", lat: 3.1339, lng: 101.7422, address: "Pandan Indah, KL", date: "2025-04-02", image: "/assets/images/Paint/P1.jpeg" },
  { id: "p3", title: "Kepayang Sentral - PS Panel Feature Wall", category: "PS/PU Panel", lat: 2.7415, lng: 101.9260, address: "Kepayang Sentral, Seremban", date: "2025-04-20", image: "/assets/images/psproject.jpeg" },
  { id: "p4", title: "Seremban 2 - Kitchen Tiling", category: "Tiles", lat: 2.7080, lng: 101.9470, address: "Seremban 2, N.S.", date: "2025-05-08", image: "/assets/images/Tiles/T1.jpeg" },
  { id: "p5", title: "Ampang - Living Room Flooring", category: "Flooring", lat: 3.1478, lng: 101.7620, address: "Ampang, KL", date: "2025-05-25", image: "/assets/images/Flooring/f1.jpeg" },
  { id: "p6", title: "Rasah - Marble Floor Polish", category: "Polish", lat: 2.7186, lng: 101.9558, address: "Rasah, Seremban", date: "2025-06-10", image: "/assets/images/Polish/l1.jpeg" },
  { id: "p7", title: "Cheras - Custom Kitchen Cabinet", category: "Cabinet", lat: 3.0738, lng: 101.7500, address: "Cheras, KL", date: "2025-06-28", image: "/assets/images/kitchencabinetproject.jpeg" },
  { id: "p8", title: "Nilai - Curtain Installation", category: "Curtain", lat: 2.7947, lng: 101.7986, address: "Nilai, N.S.", date: "2025-07-14", image: "/assets/images/Curtain/ct1.jpeg" },
  { id: "p9", title: "Senawang - Aluminum Grille Works", category: "Aluminum", lat: 2.6883, lng: 101.9738, address: "Senawang, N.S.", date: "2025-07-30", image: "/assets/images/Aluminum/a1.jpeg" },
  { id: "p10", title: "Bandar Sri Sendayan - Full Reno", category: "Ceiling & Electrical", lat: 2.7550, lng: 101.9050, address: "Bandar Sri Sendayan, N.S.", date: "2025-08-11", image: "/assets/images/Ceiling/c10.jpeg" },
  { id: "p11", title: "Wangsa Maju - Condo Painting", category: "Paint", lat: 3.2027, lng: 101.7336, address: "Wangsa Maju, KL", date: "2025-08-22", image: "/assets/images/Paint/P5.jpeg" },
  { id: "p12", title: "Sungai Petani Wine Nook - PU Panel", category: "PS/PU Panel", lat: 2.7635, lng: 101.9704, address: "Seremban, N.S.", date: "2025-09-03", image: "/assets/images/wine.jpeg" },
];
