import stylistic from "@stylistic/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

const OFF = 0;
const WARN = 1;
const ERROR = 2;

export default tseslint.config(
  {
    ignores: [
      "**/dist/*",
      "**/build/*",
      "**/.turbo/*",
      "**/.tsup/*",
      "**/node_modules/*",
      "**/styled-system/css/*",
      "**/styled-system/jsx/*",
      "**/styled-system/patterns/*",
      "**/styled-system/recipes/*",
      "**/styled-system/tokens/*",
      "**/styled-system/types/*",
      "**/styled-system/helpers.mjs",
      "frontend/postcss.config.cjs",
      "frontend/app/gen/*",
      "frontend/styled-system/*",
      "frontend/.react-router/*",
    ],
  },
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs"],
    rules: {
      "no-unused-vars": ERROR,
    },
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs", "**/*.ts", "**/*.tsx"],
    plugins: {
      "@stylistic": stylistic,
      unusedImports,
      import: importPlugin,
    },
    rules: {
      "arrow-body-style": ERROR,
      "newline-before-return": ERROR,
      "no-irregular-whitespace": ERROR,
      "no-console": ERROR,
      "no-var": ERROR,
      "no-else-return": [ERROR, { allowElseIf: false }],
      "prefer-const": ERROR,
      "eqeqeq": [ERROR, "always"],
      "camelcase": ERROR,
      "default-param-last": ERROR,
      "no-unneeded-ternary": ERROR,
      "no-use-before-define": ERROR,
      "curly": ERROR,

      "@stylistic/quotes": [ERROR, "double"],
      "@stylistic/indent": [ERROR, 2, { "SwitchCase": 1 }],
      "@stylistic/object-curly-spacing": [ERROR, "always"],
      "@stylistic/no-multiple-empty-lines": [ERROR, { max: 1, maxEOF: 0, maxBOF: 0 }],
      "@stylistic/arrow-parens": ERROR,
      "@stylistic/comma-dangle": [ERROR, {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "never",
      }],
      "@stylistic/array-bracket-newline": [ERROR, "consistent"],
      "@stylistic/array-element-newline": [ERROR, "consistent"],
      "@stylistic/member-delimiter-style": [ERROR, {
        multiline: {
          delimiter: "comma",
          requireLast: true,
        },
        singleline: {
          delimiter: "comma",
          requireLast: false,
        },
        multilineDetection: "brackets",
      }],
      "@stylistic/space-before-function-paren": [ERROR, "never"],
      "@stylistic/keyword-spacing": [ERROR, {
        before: true,
        after: true,
      }],
      "@stylistic/brace-style": [ERROR, "1tbs", { allowSingleLine: false }],
      "@stylistic/semi": [ERROR, "always"],
      "@stylistic/max-len": [ERROR, 120],
      "@stylistic/multiline-ternary": [ERROR, "always-multiline"],
      "@stylistic/quote-props": [ERROR, "as-needed", { unnecessary: false }],

      "unusedImports/no-unused-imports": ERROR,
      "unusedImports/no-unused-vars": [ERROR, {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      }],

      "import/order": [ERROR, {
        "newlines-between": "always",
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
            pattern: "images{,/**}",
            group: "external",
            position: "after",
          },
          {
            pattern: "{**/,}/lib{,/**}",
            group: "internal",
            position: "before",
          },
          {
            pattern: "{**/,}/types{,/**}",
            group: "internal",
            position: "after",
          },
          {
            pattern: "{**/,}/shared{,/**}",
            group: "internal",
            position: "before",
          },
          {
            pattern: "{**/,}/store{,/**}",
            group: "internal",
            position: "after",
          },
          {
            pattern: "{**/,}/reducer*{,/**}",
            group: "internal",
            position: "after",
          },
          {
            pattern: "{**/,}/actions{,/**}",
            group: "internal",
            position: "after",
          },
          {
            pattern: "{**/,}/selectors{,/**}",
            group: "internal",
            position: "after",
          },
          {
            pattern: "*.+(css|scss)",
            patternOptions: {
              matchBase: true,
            },
            group: "index",
            position: "after",
          },
          {
            pattern: "src/**",
            patternOptions: {
              matchBase: true,
              dot: true,
            },
            group: "sibling",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      }],
    },
  },
  {
    files: ["**/*.jsx", "**/*.tsx"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11Y,
    },
    rules: {
      "react/no-deprecated": WARN,

      "react/button-has-type": ERROR,
      "react/no-access-state-in-setstate": ERROR,
      "react/no-unused-prop-types": ERROR,
      "react/jsx-closing-bracket-location": ERROR,
      "react/jsx-curly-brace-presence": [ERROR, {
        props: "never",
        children: "never",
      }],
      "react/jsx-curly-spacing": [ERROR, {
        when: "never",
        children: true,
      }],

      "react/jsx-fragments": [ERROR, "element"],
      "react/jsx-tag-spacing": [ERROR, {
        closingSlash: "never",
        beforeSelfClosing: "always",
        afterOpening: "never",
        beforeClosing: "never",
      }],
      "react/jsx-wrap-multilines": [ERROR, {
        declaration: "parens-new-line",
        assignment: "parens-new-line",
        return: "parens-new-line",
        arrow: "parens-new-line",
        condition: "parens-new-line",
        logical: "parens-new-line",
        prop: "parens-new-line",
      }],
      "react/display-name": OFF,
      "react/self-closing-comp": ERROR,
      "react/jsx-no-bind": OFF,

      "@stylistic/jsx-quotes": [ERROR, "prefer-double"],
      "@stylistic/jsx-function-call-newline": [ERROR, "multiline"],
      "jsx-a11y/accessible-emoji": ERROR,
      "jsx-a11y/alt-text": ERROR,
      "jsx-a11y/anchor-has-content": ERROR,
      "jsx-a11y/anchor-is-valid": ERROR,
      "jsx-a11y/aria-activedescendant-has-tabindex": ERROR,
      "jsx-a11y/aria-props": ERROR,
      "jsx-a11y/aria-proptypes": ERROR,
      "jsx-a11y/aria-role": ERROR,
      "jsx-a11y/aria-unsupported-elements": ERROR,
      "jsx-a11y/click-events-have-key-events": ERROR,
      "jsx-a11y/heading-has-content": ERROR,
      "jsx-a11y/html-has-lang": ERROR,
      "jsx-a11y/iframe-has-title": ERROR,
      "jsx-a11y/img-redundant-alt": ERROR,

      "jsx-a11y/interactive-supports-focus": [ERROR, {
        tabbable: [
          "button",
          "checkbox",
          "link",
          "searchbox",
          "spinbutton",
          "switch",
          "textbox",
        ],
      }],

      "jsx-a11y/label-has-associated-control": [ERROR, {
        assert: "either",
        depth: 3,
      }],

      "jsx-a11y/media-has-caption": ERROR,
      "jsx-a11y/mouse-events-have-key-events": ERROR,
      "jsx-a11y/no-access-key": ERROR,
      "jsx-a11y/no-distracting-elements": ERROR,
      "jsx-a11y/no-interactive-element-to-noninteractive-role": ERROR,

      "jsx-a11y/no-noninteractive-element-interactions": [WARN, {
        handlers: [
          "onClick",
          "onMouseDown",
          "onMouseUp",
          "onKeyPress",
          "onKeyDown",
          "onKeyUp",
        ],
      }],

      "jsx-a11y/no-noninteractive-element-to-interactive-role": [ERROR, {
        ul: ["listbox", "menu", "menubar", "radiogroup", "tablist", "tree", "treegrid"],
        ol: ["listbox", "menu", "menubar", "radiogroup", "tablist", "tree", "treegrid"],
        li: ["menuitem", "option", "row", "tab", "treeitem"],
        table: ["grid"],
        td: ["gridcell", "columnheader", "rowheader"],
        th: ["columnheader", "rowheader"],
      }],

      "jsx-a11y/no-noninteractive-tabindex": [ERROR, {
        tags: [],
        roles: ["alertdialog", "dialog", "tabpanel"],
      }],

      "jsx-a11y/no-redundant-roles": ERROR,

      "jsx-a11y/no-static-element-interactions": [ERROR, {
        handlers: [
          "onClick",
          "onMouseDown",
          "onMouseUp",
          "onKeyPress",
          "onKeyDown",
          "onKeyUp",
        ],
      }],

      "jsx-a11y/role-has-required-aria-props": ERROR,
      "jsx-a11y/role-supports-aria-props": ERROR,
      "jsx-a11y/scope": ERROR,
      "jsx-a11y/tabindex-no-positive": ERROR,

      "react-hooks/rules-of-hooks": ERROR,
      "react-hooks/exhaustive-deps": WARN,
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@stylistic": stylistic,
      "@typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@stylistic/type-annotation-spacing": ERROR,
      "@typescript-eslint/no-explicit-any": OFF,
      "@typescript-eslint/no-unsafe-argument": OFF,
      "@typescript-eslint/no-unsafe-assignment": OFF,
      "@typescript-eslint/no-unsafe-call": OFF,
      "@typescript-eslint/restrict-template-expressions": OFF,
      "@typescript-eslint/no-unsafe-function-type": OFF,
      "@typescript-eslint/ban-ts-comment": OFF,
      "@typescript-eslint/no-unsafe-return": OFF,
      "@typescript-eslint/no-empty-object-type": OFF,
      "@typescript-eslint/consistent-type-definitions": [ERROR, "type"],
      "@typescript-eslint/array-type": [ERROR, {
        default: "generic",
      }],
      "@typescript-eslint/no-misused-promises": OFF,
      "@typescript-eslint/prefer-promise-reject-errors": OFF,
      "@typescript-eslint/no-unsafe-member-access": OFF,
      "@typescript-eslint/require-await": OFF,
      "@typescript-eslint/no-empty-function": OFF,
      "@typescript-eslint/no-use-before-define": OFF,
      "@typescript-eslint/explicit-function-return-type": OFF,
      "@typescript-eslint/no-unused-vars": OFF,
      "@typescript-eslint/camelcase": OFF,
      "@typescript-eslint/no-floating-promises": ERROR,
      "@typescript-eslint/no-inferrable-types": OFF,
      "@typescript-eslint/no-non-null-assertion": ERROR,
      "@typescript-eslint/ban-ts-ignore": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": ERROR,
    },
  },
  {
    files: ["**/*.jsx", "**/*.tsx"],
    settings: {
      react: {
        version: "detect",
      },
    },
  }
);
