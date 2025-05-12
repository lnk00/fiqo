import type { Context } from 'hono';
import { auth } from '../services/auth.service';
import type { HonoContextType } from '@server/modules/core/types';

export const authHandler = (c: Context<HonoContextType>) =>
  auth.handler(c.req.raw);
