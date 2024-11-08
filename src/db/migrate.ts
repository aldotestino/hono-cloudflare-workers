/* eslint-disable node/prefer-global/process */
/* eslint-disable no-console */
/* eslint-disable node/no-process-env */

import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

config({ path: '.dev.vars' });

const databaseUrl = drizzle(postgres(`${process.env.DATABASE_URL}`, { ssl: 'require', max: 1 }));

async function main() {
  try {
    await migrate(databaseUrl, { migrationsFolder: 'drizzle' });
    console.log('Migration complete');
  }
  catch (error) {
    console.log(error);
  }
  process.exit(0);
}
main();
