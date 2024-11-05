import type { MiddlewareHandler } from 'hono';
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

export const dbMiddleware: MiddlewareHandler = async (c, next) => {
  const client = new Pool({ connectionString: c.env.DATABASE_URL });
  const db = drizzle(client);
  c.set('db', db);

  await next();
};
