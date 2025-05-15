import { getService } from '@/ioc';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/' as never)({
  component: RouteComponent,
  beforeLoad: async () => {
    const guardService = getService('guard');
    await guardService.redirectIfNotAuthenticated();
  },
});

function RouteComponent() {
  const navigate = useNavigate({ from: '/' });
  const oBService = getService('ob');
  const sessionService = getService('session');

  const handleSignout = async () => {
    await sessionService.signout({
      onSuccess: () => {
        navigate({ to: '/signin' });
      },
    });
  };

  return (
    <div className="p-8 bg-base-100 h-screen">
      <div className="p-2 flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          className="btn btn-neutral"
          type="button"
          onClick={handleSignout}
        >
          sign out
        </button>
      </div>

      <div className="flex gap-8">
        <div className="card card-border bg-white w-96">
          <div className="card-body">
            <h2 className="card-title">Connect your bank</h2>
            <div className="card-actions">
              <button
                className="btn btn-primary"
                onClick={() => oBService.startAggregFlow()}
                type="button"
              >
                Connect Bank Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
