import { Hono } from 'hono';
import 'dotenv/config';
import { corsMiddleware } from './modules/core/middlewares/cors.middleware';
import { sessionMiddleware } from './modules/auth/middlewares/session.middleware';
import type { HonoContextType } from './modules/core/types';
import { authHandler } from './modules/auth/handlers';
import { apiVersionHandler } from './modules/core/handlers';
import {
  createBankConection,
  createDelegatedAuth,
} from './modules/openbanking/handlers';
import { guardMiddleware } from './modules/auth/middlewares/guard.middleware';

const app = new Hono<HonoContextType>();

app.use('*', corsMiddleware);
app.use('*', sessionMiddleware);
app.use('/api/authed/*', guardMiddleware);

const routes = app
  .on(['POST', 'GET'], '/api/auth/*', authHandler)
  .get('/api', apiVersionHandler)
  .get('/api/authed/ob/delegate/create', createDelegatedAuth)
  .post('/api/authed/ob/connection/create', createBankConection);

export type AppType = typeof routes;

export default app;
