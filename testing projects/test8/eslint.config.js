import globals from "globals";
    import pluginJs from "@eslint/js";
    import pluginReact from "eslint-plugin-react";
    import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
    import tseslint from "typescript-eslint";
    import pluginReactHooks from "eslint-plugin-react-hooks";
    import pluginReactRefresh from "eslint-plugin-react-refresh";

    export default [
      {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        languageOptions: {
          globals: {
            ...globals.browser,
            ...globals.node
          },
          parser: tseslint.parser,
          parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            project: ['./tsconfig.json', './tsconfig.node.json'],
            ecmaFeatures: {
              jsx: true
            }
          }
        },
        plugins: {
          react: pluginReact,
          'react-hooks': pluginReactHooks,
          'react-refresh': pluginReactRefresh,
          '@typescript-eslint': tseslint.plugin
        },
        rules: {
          ...pluginJs.configs.recommended.rules,
          ...pluginReactConfig.rules,
          ...pluginReactHooks.configs.recommended.rules,
          // Custom rules for ArtisanBake Collective
          'react/jsx-uses-react': 'off', // Not needed with new JSX transform
          'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
          'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
          ],
          'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
          'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
          '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
          '@typescript-eslint/no-explicit-any': 'warn', // Warn on 'any' usage
          'no-console': ['warn', { allow: ['warn', 'error'] }], // Warn on console.log in production
          'indent': ['error', 2, { "SwitchCase": 1 }], // Enforce 2-space indentation
          'quotes': ['error', 'single'], // Enforce single quotes
          'semi': ['error', 'always'], // Enforce semicolons
          'comma-dangle': ['error', 'always-multiline'], // Enforce trailing commas
          'object-curly-spacing': ['error', 'always'], // Enforce spaces inside object curly braces
          'array-bracket-spacing': ['error', 'never'], // Disallow spaces inside array brackets
          'arrow-spacing': ['error', { 'before': true, 'after': true }], // Enforce spaces around arrow function =>
        },
        settings: {
          react: {
            version: "detect"
          }
        }
      }
    ];