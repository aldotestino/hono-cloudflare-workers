import type { MiddlewareHandler } from 'hono';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

export const dbMiddleware: MiddlewareHandler = async (c, next) => {
  const sql = neon(c.env.DATABASE_URL);
  const db = drizzle({ client: sql });
  c.set('db', db);

  await next();
};
