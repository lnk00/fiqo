import type { Context, Next } from 'hono';
import { auth } from '../services/auth.service';
import type { HonoContextType } from '@server/modules/core/types';
import { HTTPException } from 'hono/http-exception';

export const guardMiddleware = async (
  c: Context<HonoContextType>,
  next: Next,
) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    throw new HTTPException(401, { message: 'User not authenticated' });
  }

  return next();
};
