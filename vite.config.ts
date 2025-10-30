import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/api": path.resolve(__dirname, ".src/api"),
      "@/components": path.resolve(__dirname, ".src/components"),
      "@/pages": path.resolve(__dirname, ".src/pages"),
      "@/hooks": path.resolve(__dirname, "./src/"),
      "@/types": path.resolve(__dirname, "./src/"),
      "@/utils": path.resolve(__dirname, "./src/"),
      "@/constants": path.resolve(__dirname, "./src/"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
