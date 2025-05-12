import { hc } from 'hono/client';
import type { AppType } from '../../../server/src/index.ts';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const client = hc<AppType>(SERVER_URL, {
  fetch: (input: string | Request | URL, init: RequestInit | undefined) => {
    return fetch(input, {
      ...init,
      credentials: 'include',
    });
  },
});
