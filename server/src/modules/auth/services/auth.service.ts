import { betterAuth } from 'better-auth';
import { Pool } from 'pg';
import 'dotenv/config';
import { emailOTP } from 'better-auth/plugins';
import { Resend } from 'resend';
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
          console.log('OB user created with id: ', user_id);

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
      // TODO: create email service
      async sendVerificationOTP({ email, otp }) {
        const resend = new Resend(process.env.RESEND_KEY);

        resend.emails.send({
          from: 'onboarding@resend.dev',
          to: email,
          subject: `fiqo - ${otp} is your verification code`,
          html: `<p>Enter the following verification code when prompted: ${otp}</p>`,
        });
      },
    }),
  ],
});
