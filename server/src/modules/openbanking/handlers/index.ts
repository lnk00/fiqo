import type { Context } from 'hono';
import type { HonoContextType } from '@server/modules/core/types';
import type { CreateDelegatedAuthResponse } from 'shared/dist';
import { getService } from '@server/ioc';

export const createDelegatedAuth = async (c: Context<HonoContextType>) => {
  const user = c.get('user');

  const obCoreService = getService('obcore');
  const code = await obCoreService.createDelegatedAuth(
    user?.obUserId || '',
    user?.email || '',
  );

  const data: CreateDelegatedAuthResponse = {
    code,
  };

  return c.json(data, { status: 200 });
};
