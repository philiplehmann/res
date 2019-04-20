module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'plugin:react/recommended',
    'prettier',
    'prettier/react'
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      experimentalObjectRestSpread: true,
      jsx: true
    }
  },
  plugins: ['prettier', 'babel', 'react'],
  settings: {
    react: {
      pragma: 'React',
      version: '16.3'
    }
  },
  parser: 'babel-eslint',
  rules: {
    strict: 1,
    quotes: [
      2,
      'single',
      {
        "avoidEscape": true,
        "allowTemplateLiterals": true
      }
    ],
    semi: [2, 'never'],
    curly: ['error', 'multi-line'],
    'react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'jsx-uses-react': 0,
    'jsx-uses-vars': 0,
    'default-case': 2,
    'no-unused-vars': [2, { args: 'all', argsIgnorePattern: '^_' }],
    'no-warning-comments': [
      'warn',
      {
        terms: ['todo', 'fixme'],
        location: 'anywhere'
      }
    ],
    'prettier/prettier': [
      'warn',
      {
        printWidth: 120,
        semi: false,
        singleQuote: true,
        jsxBracketSameLine: true,
        arrowParens: 'always'
      }
    ]
  }
}
