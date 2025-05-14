import { injectable } from 'inversify';
import type { ISessionService } from '../session.interface';
import { betterAuthClient } from '@/utils/http/clients/auth.client';

@injectable()
export class BetterAuthSessionImplem implements ISessionService {
  async signout(options?: { onSuccess?: () => void }) {
    await betterAuthClient.signOut({
      fetchOptions: {
        onSuccess: options?.onSuccess,
      },
    });
  }
}
