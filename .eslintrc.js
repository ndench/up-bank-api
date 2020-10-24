module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    'project': './tsconfig.json',
    'ecmaFeatures': {
      'impliedStrict': true,
      'arrowFunctions': true,
      'blockBindings': true,
      'classes': true,
      'defaultParams': true,
      'destructuring': true,
      'forOf': true,
      'generators': false,
      'modules': true,
      'objectLiteralComputedProperties': true,
      'objectLiteralDuplicateProperties': false,
      'objectLiteralShorthandMethods': true,
      'objectLiteralShorthandProperties': true,
      'spread': true,
      'superInFunctions': true,
      'templateStrings': true,
      'jsx': false,
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  rules: {
    // Possible errors
    'no-console': 'error',
    'no-extra-parens': 'error',
    // Best practices
    'no-alert': 'error',
    'no-else-return': 'error',
    'no-eval': 'error',
    'no-implicit-coercion': 'error',
    'require-await': 'error',
    // Strict
    'strict': 'error',
    // Stylistic
    'spaced-comment': 'error',
    'multiline-comment-style': 'error',
    'camelcase': 'error',
    'brace-style': 'error',
    'semi-style': 'error',
    // ES6
    'no-var': 'error',
    'no-duplicate-imports': 'error',
    // Seems to have an issue with jest mocks
    '@typescript-eslint/unbound-method': 'off',
  },
};
