import { betterAuth } from 'better-auth';
import { Pool } from 'pg';
import 'dotenv/config';
import { emailOTP } from 'better-auth/plugins';
import { getService } from '@server/ioc';
import { sql } from 'bun';

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: true,
  }),
  trustedOrigins: [process.env.FRONT_URL || ''],
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
        after: async (user) => {
          const obCoreService = getService('obcore');
          const provider_user_id = await obCoreService.createUser();

          await sql`
            INSERT INTO ob_provider (type, provider_user_id, user_id) 
            VALUES ('tink', ${provider_user_id}, ${user.id})
            RETURNING *
          `;
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
