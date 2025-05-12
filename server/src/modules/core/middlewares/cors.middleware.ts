import { cors } from 'hono/cors';

export const corsMiddleware = cors({
  origin: process.env.FRONT_URL || '',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
});
