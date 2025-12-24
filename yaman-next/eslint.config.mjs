import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  // 1. Load default Next.js configurations
  ...nextVitals,
  ...nextTs,

  // 2. Add a separate object specifically for your custom rules
  {
    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off"
    },
  },

  // 3. Define ignores
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;