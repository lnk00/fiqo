export const startTinkLinkAggregFlow = () => {
  const market = 'EU';
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
};
