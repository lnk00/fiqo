import { getService } from '@/ioc';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export type AggregCallbackStatus = 'processing' | 'success' | 'error';

export interface AggregCallbackState {
  status: AggregCallbackStatus;
  message: string;
}

export function useAggregCallback() {
  const navigate = useNavigate();
  const [state, setState] = useState<AggregCallbackState>({
    status: 'processing',
    message: 'Processing your bank connection...',
  });
  const oBService = getService('ob');

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    try {
      oBService.handleAggregCallback();
      setState({
        status: 'success',
        message: 'Bank account connected successfully!',
      });

      setTimeout(() => navigate({ to: '/' as never }), 2000);
    } catch (error) {
      console.error(error);
      setState({
        status: 'error',
        message: error as string,
      });
      setTimeout(() => navigate({ to: '/' as never }), 3000);
    }
  }, []);

  return state;
}
