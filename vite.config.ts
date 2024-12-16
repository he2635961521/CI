import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import stylelintPlugin from "vite-plugin-stylelint";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    stylelintPlugin({
      fix: true,
      files: ["**/*.{css,less}"],
      exclude: ["node_modules/**/*", "dist/**/*", "public/**/*"],
    }),
  ],
});
