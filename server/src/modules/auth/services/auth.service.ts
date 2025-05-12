import { betterAuth } from 'better-auth';
import { Pool } from 'pg';
import 'dotenv/config';
import { emailOTP } from 'better-auth/plugins';

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
      async sendVerificationOTP({ email, otp, type }) {
        console.log(
          `send otp email to ${email} with the code ${otp} to ${type}.`,
        );
      },
    }),
  ],
});
