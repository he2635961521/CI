import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import stylelintPlugin from "vite-plugin-stylelint";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    stylelintPlugin({
      fix: true,
      files: ["**/*.{css,less}"],
      exclude: ["node_modules/**/*", "dist/**/*", "public/**/*"],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        other: resolve(__dirname, "src/iframe/index.html"),
      },
    },
  },
});
