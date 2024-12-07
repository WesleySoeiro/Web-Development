import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,

        ...globals.node,
      },
      ecmaVersion: 2021,
      sourceType: "module",
    },

    rules: {
      indent: ["error", 2],

      "linebreak-style": ["error", "windows"],

      quotes: ["error", "double"],

      semi: ["error", "always"],
    },
  },

  pluginJs.configs.recommended,
];
