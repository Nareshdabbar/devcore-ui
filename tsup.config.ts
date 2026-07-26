import { defineConfig } from "tsup";
import { sassPlugin } from "esbuild-sass-plugin";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  injectStyle: false, // Emits all CSS into dist/index.css
  external: ["react", "react-dom"],
  esbuildPlugins: [
    // 1. Catches CSS Modules FIRST (*.module.scss / *.module.css)
    sassPlugin({
      filter: /\.module\.(s[ac]ss|css)$/,
      type: "local-css",
    }),
    // 2. Catches all remaining SCSS/CSS files (theme.scss, variables, global styles)
    sassPlugin({
      filter: /\.(s[ac]ss|css)$/,
      type: "css",
    }),
  ],
});