import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth';
import { client } from '@/lib/rpc';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/' as never)({
  component: RouteComponent,
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession();
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

  useEffect(() => {
    client.api.$get();
  }, []);

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: '/signin' });
        },
      },
    });
  };

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Button onClick={handleSignout}>sign-out</Button>
    </div>
  );
}
