import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/bds-schema-gen.js",
      format: "es",
    },
  ],
  external: [/node_modules/],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    json(),
    commonjs(),
    nodeResolve(),
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
    }),
  ],
};
