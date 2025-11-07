import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // permite acesso externo (0.0.0.0)
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "elise-noncoalescent-historically.ngrok-free.dev",
    ],
  },
});
