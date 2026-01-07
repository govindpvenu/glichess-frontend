module.exports = {
    root: true,
    env: { 
        browser: true, 
        es2020: true,
        node: true,
    },
    extends: ["eslint:recommended", "plugin:react-hooks/recommended", "prettier"],
    ignorePatterns: ["dist", ".eslintrc.cjs", "routeTree.gen.ts"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ["react-refresh"],
    settings: {
        react: {
            version: "detect",
        },
    },
    globals: {
        React: "readonly",
    },
    rules: {
        "react-refresh/only-export-components": [
            "warn",
            {
                allowConstantExport: true,
                allowExportNames: [
                    "cn",
                    "Icons",
                    "badgeVariants",
                    "buttonVariants",
                    "toggleVariants",
                    "navigationMenuTriggerStyle",
                    "useSocketContext",
                    "useTheme",
                ],
            },
        ],
        "no-unused-vars": "off",
        "no-undef": "error",
    },
}




















// "plugin:@typescript-eslint/recommended",