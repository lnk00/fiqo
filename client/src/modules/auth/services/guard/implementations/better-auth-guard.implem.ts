import { injectable } from 'inversify';
import { betterAuthClient } from '@/utils/http/clients/auth.client';
import type { IGuardService } from '../guard.interface';
import { redirect } from '@tanstack/react-router';

@injectable()
export class BetterAuthGuardImplem implements IGuardService {
  async redirectIfNotAuthenticated() {
    const { data: session } = await betterAuthClient.getSession();
    if (!session) {
      throw redirect({
        to: '/signin',
        search: {
          redirect: location.href,
        },
      });
    }
  }
  async redirectIfAuthenticated() {
    const { data: session } = await betterAuthClient.getSession();
    if (session) {
      throw redirect({
        to: '/' as never,
      });
    }
  }
}
