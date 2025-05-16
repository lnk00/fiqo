import type { Context } from 'hono';
import type { HonoContextType } from '@server/modules/core/types';
import type { ApiVersionResponse } from 'shared/dist';

export const apiVersionHandler = async (c: Context<HonoContextType>) => {
  return c.json(
    {
      name: 'fiqo api',
      version: 'v0.0.1',
    } as ApiVersionResponse,
    { status: 200 },
  );
};
