import type { Context } from 'hono';
import type { HonoContextType } from '@server/modules/core/types';
import type { ApiVersionResponse } from 'shared/dist';

export const apiVersionHandler = async (c: Context<HonoContextType>) => {
  const sesssion = c.get('session');
  const user = c.get('user');

  console.log(sesssion);
  console.log(user);

  const data: ApiVersionResponse = {
    name: 'fiqo api',
    version: 'v0.0.1',
  };

  return c.json(data, { status: 200 });
};
