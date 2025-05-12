import type { Context, Next } from 'hono';
import { auth } from '../services/auth.service';
import type { HonoContextType } from '@server/modules/core/types';

export const sessionMiddleware = async (
  c: Context<HonoContextType>,
  next: Next,
) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set('user', null);
    c.set('session', null);
    return next();
  }

  c.set('user', session.user);
  c.set('session', session.session);
  return next();
};
