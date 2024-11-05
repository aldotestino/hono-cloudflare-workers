import type { Env, Variables } from '@/lib/types';
import { insertPostSchema, posts } from '@/db/schema';
import { getAuth } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';

export const postRoute = new Hono<{ Bindings: Env; Variables: Variables }>();

postRoute.get('/', async (c) => {
  const db = c.get('db');

  const allPosts = await db.select().from(posts);
  return c.json(allPosts);
});

postRoute.get('/:id', zValidator('param', z.object({
  id: z.coerce.number(),
})), async (c) => {
  const { id } = await c.req.valid('param');

  const db = c.get('db');

  const [post] = await db.select().from(posts).where(eq(posts.id, id));

  if (!post) {
    c.status(404);
    return c.json({ error: 'Post not found' });
  }

  return c.json(post);
});

postRoute.post('/', zValidator('json', insertPostSchema), async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    c.status(401);
    return c.json({ error: 'Unauthorized' });
  }

  const db = c.get('db');

  const { title, content } = await c.req.valid('json');
  const newPost = await db.insert(posts).values({ title, content, userId: auth.userId }).returning();
  return c.json(newPost);
});
