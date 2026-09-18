import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        { type: "app", pattern: "src/app/**/*" },
        { type: "feature", pattern: "src/features/*/**/*", capture: ["featureName"] },
        { type: "shared", pattern: "src/{components,lib,hooks,stores,types}/**/*" },
      ],
    },
    rules: {
      // app → features → shared; features never import each other
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          rules: [
            { from: { type: "app" }, allow: { to: { type: ["feature", "shared"] } } },
            {
              from: { type: "feature" },
              allow: { to: [{ type: "shared" }, { type: "feature", captured: { featureName: "{{from.featureName}}" } }] },
            },
            { from: { type: "shared" }, allow: { to: { type: "shared" } } },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
