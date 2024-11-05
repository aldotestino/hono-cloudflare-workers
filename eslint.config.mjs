import antfu from '@antfu/eslint-config';

export default antfu({
  typescript: true,
  rules: {
    'ts/consistent-type-definitions': ['error', 'type'],
    'node/no-process-env': 'warn',
  },
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: true,
  },
});
