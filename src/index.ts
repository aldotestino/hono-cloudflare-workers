import type { NeonQueryFunction } from '@neondatabase/serverless';
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { Hono } from 'hono';
import { dbMiddleware } from './db/middleware';
import { posts } from './db/schema';

type Env = {
  DATABASE_URL: string;
};

type Variables = {
  db: NeonHttpDatabase<Record<string, never>> & {
    $client: NeonQueryFunction<false, false>;
  };
};

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

app.use(dbMiddleware);

app.get('/', async (c) => {
  const db = c.get('db');

  const allPosts = await db.select().from(posts);

  return c.json(allPosts);
});

app.post('/', async (c) => {
  const db = c.get('db');

  const { title, content } = await c.req.json();

  const newPost = await db.insert(posts).values({ title, content }).returning();

  return c.json(newPost);
});

export default app;
