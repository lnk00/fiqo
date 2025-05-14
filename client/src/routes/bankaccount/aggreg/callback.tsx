import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/callback' as never)({
  component: CallbackComponent,
});

function CallbackComponent() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>(
    'processing',
  );
  const [message, setMessage] = useState('Processing your bank connection...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get code from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');
        const errorMessage = urlParams.get('message');

        if (error) {
          setStatus('error');
          setMessage(`Error: ${errorMessage || 'Unknown error'}`);
          // Redirect to home after 3 seconds on error
          setTimeout(() => navigate({ to: '/' as never }), 3000);
          return;
        }

        if (!code) {
          setStatus('error');
          setMessage('No authorization code received');
          // Redirect to home after 3 seconds on error
          setTimeout(() => navigate({ to: '/' as never }), 3000);
          return;
        }

        // Here you would typically send the code to your backend
        // to exchange it for an access token
        // const response = await fetch('/api/tink/exchange-token', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ code }),
        // });

        // if (!response.ok) throw new Error('Failed to exchange token');

        // For demo purposes, we'll just simulate a successful response
        setStatus('success');
        setMessage('Bank account connected successfully!');

        // Redirect to home after 2 seconds on success
        setTimeout(() => navigate({ to: '/' as never }), 2000);
      } catch (error) {
        console.error('Error handling Tink callback:', error);
        setStatus('error');
        setMessage('An unexpected error occurred');
        // Redirect to home after 3 seconds on error
        setTimeout(() => navigate({ to: '/' as never }), 3000);
      }
    };

    handleCallback();
  }, [navigate]);

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
          {status === 'error' && (
            <div className="bg-red-100 text-red-800 rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
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
