import { hcWithType } from 'server';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const client = hcWithType(SERVER_URL, {
  fetch: (input: string | Request | URL, init: RequestInit | undefined) => {
    return fetch(input, {
      ...init,
      credentials: 'include',
    });
  },
});
