import { defineConfig } from "tsup";
import { sassPlugin } from "esbuild-sass-plugin";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  injectStyle: false, // Emits everything into dist/index.css
  external: ["react", "react-dom"],
  esbuildPlugins: [
    sassPlugin({
      type: "css", // Standard SCSS
      transform: (source, resolveDir, filePath) => {
        // If it's a CSS Module file, return it as local-css so hashes get generated
        return filePath.endsWith(".module.scss") || filePath.endsWith(".module.css")
          ? "local-css"
          : "css";
      },
    }),
  ],
});