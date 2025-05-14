import { createFileRoute } from '@tanstack/react-router';
import { Check, CircleAlert } from 'lucide-react';
import { useAggregCallback } from '@/modules/bankaccount/hooks/useAggregCallback.hook';

export const Route = createFileRoute('/callback' as never)({
  component: CallbackComponent,
});

function CallbackComponent() {
  const { status, message } = useAggregCallback();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {status === 'processing' && 'Processing'}
          {status === 'success' && 'Success!'}
          {status === 'error' && 'Error'}
        </h1>

        <div className="flex justify-center mb-4">
          {status === 'processing' && (
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700" />
          )}
          {status === 'success' && (
            <div className="bg-green-100 text-green-800 rounded-full p-2">
              <Check />
            </div>
          )}
          {status === 'error' && (
            <div className="bg-red-100 text-red-800 rounded-full p-2">
              <CircleAlert />
            </div>
          )}
        </div>

        <p className="text-center text-gray-700">{message}</p>

        {(status === 'success' || status === 'error') && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Redirecting you back to the dashboard...
          </p>
        )}
      </div>
    </div>
  );
}
