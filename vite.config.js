import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/

export default defineConfig({
  plugins: [
    react({
      include: "**/*.jsx",
    }),
  ],
  server: {
    open: true,
    hmr: true,
    watch: {
      usePolling: true,
    },
  },
});
