import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  // Next.js recommended rules
  ...nextVitals,
  ...nextTs,

  // Project-specific rules
  {
    rules: {
      /* General */
      "no-console": "warn",
      "no-debugger": "error",

      /* TypeScript */
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],

      /* React */
      "react/react-in-jsx-scope": "off",

      /* Import order */
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },

  // Ignore build outputs
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
