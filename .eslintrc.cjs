module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    "plugin:@typescript-eslint/recommended",
    'prettier',
  ],
  plugins: [
    '@typescript-eslint',
    'import',
    'simple-import-sort',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  env: {
    es6: true,
    node: true,
  },
  ignorePatterns: ['.eslintrc.cjs'],
  rules: {
    'no-var': 'error',
    semi: 'error',
    'no-multi-spaces': 'error',
    'space-in-parens': 'error',
    'no-multiple-empty-lines': 'error',
    'prefer-const': 'error',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // Internal packages.
          ['^(@|components)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        ],
      },
    ],
    // TypeScript Rules
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/adjacent-overload-signatures': 'warn',
    '@typescript-eslint/ban-types': 'warn',

    // Import and Export related Rules
    'no-duplicate-imports': 'warn',

    // Code Style Rules
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    indent: ['warn', 2, { SwitchCase: 1,  }],
    'max-len': [
      'warn',
      {
        code: 160,
        tabWidth: 4,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTrailingComments: true,
        ignorePattern: '^\\s*(let|const)\\s.+=\\s*require\\s*\\(',
        ignoreRegExpLiterals: true,
      },
    ],
    'no-unused-vars': 'warn',
    'capitalized-comments': 'off',
    curly: 'warn',
    complexity: ['warn', 100],
    'new-parens': 'warn',
    'brace-style': ['warn', '1tbs', { allowSingleLine: true }],

    // Spacing Rules
    'space-before-function-paren': ['warn', 'never'],
    'space-infix-ops': 'warn',
    'no-trailing-spaces': 'warn',
    'space-in-parens': ['warn', 'always'],
    'object-curly-spacing': ['warn', 'always'],
    'array-bracket-spacing': ['warn', 'always'],
    'block-spacing': ['warn', 'always'],
    'space-before-blocks': ['warn', 'always'],
    'arrow-spacing': ['warn', { before: true, after: true }],
    'keyword-spacing': ['warn', { before: true, after: true }],
    'switch-colon-spacing': ['warn', { before: true, after: true }],
    'comma-dangle': ['warn', 'never'],
    'comma-spacing': ['warn', { before: false, after: true }],
    'func-call-spacing': ['warn', 'never'],
    'key-spacing': ['warn', { afterColon: true }],
    'lines-between-class-members': ['warn', 'always'],

    // No related rules
    'no-bitwise': 'warn',
    'no-extra-parens': 'warn',
    'no-constructor-return': 'warn',
    'no-duplicate-case': 'warn',
    // 'no-console': 'warn',
    'no-debugger': 'warn',
    'no-empty': 'warn',
    'no-eval': 'warn',
    'no-sparse-arrays': 'warn',
    'no-unsafe-finally': 'warn',
    'no-extra-semi': 'warn',
  },
};