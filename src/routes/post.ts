import type { Env, Variables } from '@/lib/types';
import { insertPostSchema, posts } from '@/db/schema';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

export const postRoute = new Hono<{ Bindings: Env; Variables: Variables }>();

postRoute.get('/', async (c) => {
  const db = c.get('db');

  const allPosts = await db.select().from(posts);
  return c.json(allPosts);
});

postRoute.post('/', zValidator('json', insertPostSchema), async (c) => {
  const db = c.get('db');

  const { title, content } = await c.req.valid('json');
  const newPost = await db.insert(posts).values({ title, content }).returning();
  return c.json(newPost);
});
