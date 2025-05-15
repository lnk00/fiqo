import { rpcClient } from '@/utils/http/clients/rpc.client';
import type { IOBService } from '../ob.interface';
import { injectable } from 'inversify';

@injectable()
export class TinkImplem implements IOBService {
  startAggregFlow() {
    rpcClient.api.ob.delegate
      .$get()
      .then((res) => res.json())
      .then((d) => console.log(d));
    // this.openTinkLink();
  }

  handleAggregCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    const errorMessage = urlParams.get('message');

    if (error || !code) throw errorMessage || 'Error: bank connection failed';

    return code;
  }

  private openTinkLink() {
    const market = 'FR';
    const locale = 'en_US';

    const tinkLinkUrl = new URL(
      'https://link.tink.com/1.0/transactions/connect-accounts',
    );

    tinkLinkUrl.searchParams.append(
      'client_id',
      import.meta.env.VITE_TINK_CLIENT_ID,
    );
    tinkLinkUrl.searchParams.append(
      'redirect_uri',
      `${window.location.origin}/bankaccount/aggreg/callback`,
    );

    tinkLinkUrl.searchParams.append('market', market);
    tinkLinkUrl.searchParams.append('locale', locale);

    window.location.href = tinkLinkUrl.toString();
  }
}
