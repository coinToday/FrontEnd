import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import airbnb from "eslint-config-airbnb";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    env: {
      browser: true,
      es2021: true,
    },
    parser: "@typescript-eslint/parser", // TypeScript parser 추가
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 15,
      sourceType: "module",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  airbnb, // Airbnb 설정 추가
  ...airbnbHooks, // 추가적인 airbnb 설정이 있을 경우

  {
    plugins: ["react", "@typescript-eslint", "prettier"], // Prettier 플러그인 추가
    extends: [
      "plugin:react/recommended",
      "airbnb",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended", // Prettier 설정 추가
    ],
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": [
        1,
        { extensions: [".js", ".jsx", ".ts", ".tsx"] },
      ],
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "prettier/prettier": "error", // Prettier 규칙을 ESLint 규칙으로 처리
    },
  },
];
