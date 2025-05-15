import { betterAuth } from 'better-auth';
import { Pool } from 'pg';
import 'dotenv/config';
import { emailOTP } from 'better-auth/plugins';
import { getService } from '@server/ioc';

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DB_URL,
    ssl: true,
  }),
  trustedOrigins: [process.env.FRONT_URL || ''],
  user: {
    additionalFields: {
      obUserId: {
        type: 'string',
        required: false,
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const obCoreService = getService('obcore');
          const user_id = await obCoreService.createUser();

          return {
            data: {
              ...user,
              obUserId: user_id,
            },
          };
        },
      },
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        const mailService = getService('mail');
        mailService.sendOtp(email, otp);
      },
    }),
  ],
});
