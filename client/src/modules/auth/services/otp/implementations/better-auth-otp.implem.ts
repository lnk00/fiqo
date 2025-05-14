import { injectable } from 'inversify';
import type { IOtpService } from '../otp.interface';
import { betterAuthClient } from '@/utils/http/clients/auth.client';

@injectable()
export class BetterAuthOtpImplem implements IOtpService {
  async sendOtpMail(email: string) {
    const { error } = await betterAuthClient.emailOtp.sendVerificationOtp({
      email: email,
      type: 'sign-in',
    });

    if (error) throw error;
  }

  async sendOtpVerification(email: string, code: string) {
    const { error } = await betterAuthClient.signIn.emailOtp({
      email: email,
      otp: code,
    });

    if (error) throw error;
  }
}
