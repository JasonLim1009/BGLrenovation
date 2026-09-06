import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "BGL Design & Build",
        short_name: "BGL Design",
        description:
          "BGL Design & Build - renovation, wall panels, custom furniture, plaster ceiling, electrical, flooring, painting & deep cleaning.",
        theme_color: "#0b1426",
        background_color: "#0b1426",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // cache the built app shell + JS/CSS
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpeg,jpg}"],
        // don't try to precache the whole 200+ image gallery (too big for
        // the install-time precache) — let the runtime rule below handle it
        globIgnores: ["assets/images/**"],
        runtimeCaching: [
          {
            // site images: serve from cache first, refresh in the background
            urlPattern: ({ url }) => url.pathname.startsWith("/assets/images/"),
            handler: "CacheFirst",
            options: {
              cacheName: "bgl-images",
              expiration: {
                maxEntries: 300,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            // google fonts
            urlPattern: ({ url }) => url.origin === "https://fonts.googleapis.com" || url.origin === "https://fonts.gstatic.com",
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
});
