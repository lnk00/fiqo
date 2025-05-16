import { createAuthClient } from 'better-auth/react';
import {
  emailOTPClient,
  inferAdditionalFields,
} from 'better-auth/client/plugins';

export const betterAuthClient = createAuthClient({
  baseURL: import.meta.env.VITE_SERVER_URL,
  plugins: [inferAdditionalFields({}), emailOTPClient()],
});
