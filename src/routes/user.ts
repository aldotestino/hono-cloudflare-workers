import type { Env, Variables } from '@/lib/types';
import { posts } from '@/db/schema';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';

export const userRoute = new Hono<{ Bindings: Env; Variables: Variables }>();

userRoute.get('/:id', zValidator('param', z.object({
  id: z.string(),
})), async (c) => {
  const { id } = c.req.valid('param');

  const clerk = c.get('clerk');
  const db = c.get('db');

  const userPosts = await db.select().from(posts).where(eq(posts.userId, id));

  const user = await clerk.users.getUser(id);

  return c.json({
    user: {
      id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.primaryEmailAddress?.emailAddress,
      imageUrl: user.imageUrl,
    },
    posts: userPosts,
  });
});
