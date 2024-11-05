import type { Env, Variables } from '@/lib/types';
import { dbMiddleware } from '@/db/middleware';

import { Hono } from 'hono';
import { postRoute } from './routes/post';

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

// middlewares
app.use(dbMiddleware);

// routes
app.route('/api/v1/post', postRoute);

export default app;
