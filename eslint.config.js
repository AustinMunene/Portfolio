import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    /* Netlify functions. Separate from the block above because the glob there
       is .ts/.tsx, which silently skips .mts - so these were reported as
       "File ignored because no matching configuration was supplied" and never
       linted. They also run on Node rather than in the browser, and none of the
       React plugins apply to them. */
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['netlify/**/*.{ts,mts}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
    },
  }
);
