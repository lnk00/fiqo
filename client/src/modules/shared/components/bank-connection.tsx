import { Button } from './ui/button';

interface BankConnectionProps {
  redirectUri: string;
  market?: string;
  locale?: string;
  className?: string;
}

export function BankConnection({
  redirectUri,
  market = 'EU',
  locale = 'en_US',
  className,
}: BankConnectionProps) {
  const openTinkLink = () => {
    // Construct the Tink Link URL with provided parameters
    const tinkLinkUrl = new URL(
      'https://link.tink.com/1.0/transactions/connect-accounts',
    );

    // Add required parameters
    tinkLinkUrl.searchParams.append(
      'client_id',
      import.meta.env.VITE_TINK_CLIENT_ID,
    );
    tinkLinkUrl.searchParams.append('redirect_uri', redirectUri);

    // Add optional parameters
    if (market) tinkLinkUrl.searchParams.append('market', market);
    if (locale) tinkLinkUrl.searchParams.append('locale', locale);

    // Redirect the user to Tink Link
    window.location.href = tinkLinkUrl.toString();
  };

  return (
    <Button onClick={openTinkLink} className={className}>
      Connect Bank Account
    </Button>
  );
}
