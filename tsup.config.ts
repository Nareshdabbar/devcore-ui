import { defineConfig } from "tsup";
import { sassPlugin } from "esbuild-sass-plugin";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  esbuildPlugins: [
    sassPlugin({
      // Dynamically assign "local-css" to *.module.scss and "css" to global scss
      type: (args) => (/\.module\.(s[ac]ss|css)$/.test(args) ? "local-css" : "css"),
    }),
  ],
});