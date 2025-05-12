import { auth } from '@server/lib/auth.lib';
import type { Context, Next } from 'hono';
import type { HonoContext } from '..';

export const sessionMiddleware = async (
  c: Context<HonoContext>,
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
