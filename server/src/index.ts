import { Hono } from 'hono';
import type { ApiResponse } from 'shared/dist';
import { hc } from 'hono/client';
import 'dotenv/config';
import { auth } from './lib/auth.lib';
import { corsMiddleware } from './middlewares/cors.middleware';
import { sessionMiddleware } from './middlewares/session.middleware';

export type HonoContext = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

const app = new Hono<HonoContext>();

app.use('*', corsMiddleware);
app.use('*', sessionMiddleware);

app.on(['POST', 'GET'], '/api/auth/*', (c) => {
  return auth.handler(c.req.raw);
});

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/hello', async (c) => {
  const data: ApiResponse = {
    message: 'Hello BHVR!',
    success: true,
  };

  return c.json(data, { status: 200 });
});

const client = hc<typeof app>('');
export type Client = typeof client;

export const hcWithType = (...args: Parameters<typeof hc>): Client =>
  hc<typeof app>(...args);

export default app;
