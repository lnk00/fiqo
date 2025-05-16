import type { Context } from 'hono';
import type { HonoContextType } from '@server/modules/core/types';
import type { CreateDelegatedAuthResponse } from 'shared/dist';
import { getService } from '@server/ioc';
import { sql } from 'bun';

export const createDelegatedAuth = async (c: Context<HonoContextType>) => {
  const user = c.get('user');
  const obCoreService = getService('obcore');

  const code = await obCoreService.createDelegatedAuth(
    user?.id || '',
    user?.email || '',
  );

  const data: CreateDelegatedAuthResponse = {
    code,
  };

  return c.json(data, { status: 200 });
};

export const createBankConection = async (c: Context<HonoContextType>) => {
  const body = await c.req.json();
  const user = c.get('user');
  const bankConnectionId = body.bankConnectionId;

  await sql`
    UPDATE public.ob_provider
    SET bank_connection_ids = array_append(bank_connection_ids, ${bankConnectionId})
    WHERE user_id = ${user?.id}
  `;

  return c.json({}, { status: 200 });
};
