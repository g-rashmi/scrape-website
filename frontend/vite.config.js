\import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",  // This makes the Vite dev server accessible from any IP address
    port: 5173,       // Port your app is running on (you can change it if necessary)
  },
});
