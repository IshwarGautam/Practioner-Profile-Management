import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/users/signin": "http://localhost:5000/",
      "/users/signup": "http://localhost:5000/",
    },
  },
  plugins: [react()],
});
