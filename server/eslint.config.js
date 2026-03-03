import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,

    {
        files: ["**/*.ts"],
        languageOptions: {
            globals: globals.node,
        },
        rules: {
            "no-console": "off",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-explicit-any": "off",
        },
    },

    {
        settings: {
            "import/resolver": {
                typescript: {
                    project: "./tsconfig.json",
                },
            },
        },
    },
];
