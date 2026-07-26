import { defineConfig } from "tsup";
import { sassPlugin } from "esbuild-sass-plugin";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  injectStyle: false, // Prevents inline style injection and emits dist/index.css
  external: ["react", "react-dom"],
  esbuildPlugins: [
    sassPlugin({
      type: "css", // Must be static "css" to bundle everything into dist/index.css
    }),
  ],
});