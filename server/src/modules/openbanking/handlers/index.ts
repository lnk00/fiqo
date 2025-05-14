import type { Context } from 'hono';
import type { HonoContextType } from '@server/modules/core/types';
import type { CreateOBUserResponse } from 'shared/dist';
import { getService } from '@server/ioc';

export const createOBUserHandler = async (c: Context<HonoContextType>) => {
  const obCoreService = getService('obcore');
  const userId = await obCoreService.createUser();

  const data: CreateOBUserResponse = {
    user_id: userId,
  };

  return c.json(data, { status: 200 });
};
