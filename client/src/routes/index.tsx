import { getService } from '@/ioc';
import { Button } from '@/modules/shared/components/ui/button';
import { betterAuthClient } from '@/utils/http/clients/auth.client';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/' as never)({
  component: RouteComponent,
  beforeLoad: async () => {
    const { data: session } = await betterAuthClient.getSession();
    if (!session) {
      throw redirect({
        to: '/signin',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  const navigate = useNavigate({ from: '/' });
  const OBService = getService('ob');

  const handleSignout = async () => {
    await betterAuthClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: '/signin' });
        },
      },
    });
  };

  return (
    <div className="p-8">
      <div className="p-2 flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={handleSignout}>Sign Out</Button>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-xl border overflow-hidden p-6">
        <h2 className="text-xl font-semibold mb-4">Connect Your Bank</h2>
        <p className="mb-4 text-gray-600">
          Link your bank account to access financial services.
        </p>

        <Button onClick={OBService.startAggregFlow} className="w-full">
          Connect Bank Account
        </Button>
      </div>
    </div>
  );
}
