import { injectable } from 'inversify';
import type { IOBCoreService } from '../obcore.interface';

type AccessTokenScopes = 'user:create' | 'authorization:grant';

@injectable()
export class TinkOBCoreImplem implements IOBCoreService {
  BASE_URL = 'https://api.tink.com/api/v1';

  async createUser() {
    const access_token = await this.createAccessToken(['user:create']);

    const response = await fetch(`${this.BASE_URL}/user/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        locale: 'en_US',
        market: 'FR',
      }),
    });

    const d = (await response.json()) as { user_id: string };

    return d.user_id;
  }

  async createDelegatedAuth(userId: string, hint: string) {
    const access_token = await this.createAccessToken(['authorization:grant']);

    const params = new URLSearchParams();
    params.append('user_id', userId);
    params.append('id_hint', hint);
    params.append('actor_client_id', 'df05e4b379934cd09963197cc855bfe9');
    params.append(
      'scope',
      'credentials:read,credentials:refresh,credentials:write,providers:read,user:read,authorization:read',
    );

    const response = await fetch(
      `${this.BASE_URL}/oauth/authorization-grant/delegate`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      },
    );

    const d = (await response.json()) as { code: string };

    return d.code;
  }

  private async createAccessToken(scopes: AccessTokenScopes[]) {
    const params = new URLSearchParams();
    params.append('client_id', process.env.TINK_CLIENT_ID as string);
    params.append('client_secret', process.env.TINK_CLIENT_SECRET as string);
    params.append('grant_type', 'client_credentials');
    params.append('scope', scopes.join(','));

    const response = await fetch(`${this.BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    const d = (await response.json()) as { access_token: string };
    return d.access_token;
  }
}
