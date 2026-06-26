import pluginNext from "@next/eslint-plugin-next";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  {
    ignores: [".next", "dist", "node_modules"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@next/next": pluginNext,
      "@typescript-eslint": typescriptEslint,
      import: importPlugin,
      prettier,
      "simple-import-sort": simpleImportSort,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    settings: {
      next: {
        rootDir: ".",
      },
    },
    rules: {
      "@next/next/no-html-link-for-pages": "warn",
      "@next/next/no-img-element": "warn",
      "prettier/prettier": "warn",
      "simple-import-sort/imports": "off",
      "simple-import-sort/exports": "off",
    },
  },
];
