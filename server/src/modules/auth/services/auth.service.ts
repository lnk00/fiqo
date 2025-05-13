import { betterAuth } from 'better-auth';
import { Pool } from 'pg';
import 'dotenv/config';
import { emailOTP } from 'better-auth/plugins';
import { Resend } from 'resend';

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DB_URL,
    ssl: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    emailOTP({
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
  trustedOrigins: [process.env.FRONT_URL || ''],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
});
