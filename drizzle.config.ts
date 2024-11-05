import type { Config } from 'drizzle-kit';

export default {
  dialect: 'postgresql',
  casing: 'snake_case',
  schema: './src/db/schema.ts',
  out: './drizzle',
} satisfies Config;
