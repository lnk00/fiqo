import { rpcClient } from '@/utils/http/clients/rpc.client';
import type { IOBService } from '../ob.interface';
import { injectable } from 'inversify';

@injectable()
export class TinkImplem implements IOBService {
  async startAggregFlow() {
    const res = await rpcClient.api.authed.ob.delegate.create.$get();
    const { code } = await res.json();
    this.openTinkLink(code);
  }

  async handleAggregCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const credentialsId = urlParams.get('credentialsId');
    const error = urlParams.get('error');
    const errorMessage = urlParams.get('message');

    if (error || !credentialsId)
      throw errorMessage || 'Error: bank connection failed';

    await rpcClient.api.authed.ob.connection.create.$post({
      json: {
        bankConnectionId: credentialsId,
      },
    });

    return credentialsId;
  }

  private openTinkLink(authCode: string) {
    const tinkLinkUrl = new URL('https://link.tink.com/1.0/credentials/add');

    tinkLinkUrl.searchParams.append(
      'client_id',
      import.meta.env.VITE_TINK_CLIENT_ID as string,
    );
    tinkLinkUrl.searchParams.append(
      'redirect_uri',
      `${window.location.origin}/bankaccount/aggreg/callback`,
    );
    tinkLinkUrl.searchParams.append('authorization_code', authCode);
    window.location.href = tinkLinkUrl.toString();
  }
}
