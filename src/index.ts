import type { Env, Variables } from '@/lib/types';
import { dbMiddleware } from '@/db/middleware';
import { clerkMiddleware } from '@hono/clerk-auth';

import { Hono } from 'hono';
import { postRoute } from './routes/post';
import { userRoute } from './routes/user';

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

// middlewares
app.use(dbMiddleware);
app.use(clerkMiddleware());

// routes
app.route('/api/v1/post', postRoute);
app.route('/api/v1/user', userRoute);

export default app;
