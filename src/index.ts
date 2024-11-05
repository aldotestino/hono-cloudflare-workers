import { Hono } from 'hono';
import { dbMiddleware } from './db/middleware';

type Env = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Env }>();

app.use(dbMiddleware);

app.get('/', (c) => {
  return c.json({
    message: 'Deployed by Github Action',
  });
});

export default app;
