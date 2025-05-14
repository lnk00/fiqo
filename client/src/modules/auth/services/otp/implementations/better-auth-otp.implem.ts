import { injectable } from 'inversify';
import type { IOtpService } from '../otp.interface';
import { authClient } from '../../auth-client.service';

@injectable()
export class BetterAuthOtpImplem implements IOtpService {
  async sendOtpMail(email: string) {
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email: email,
      type: 'sign-in',
    });

    if (error) throw error;
  }

  async sendOtpVerification(email: string, code: string) {
    const { error } = await authClient.signIn.emailOtp({
      email: email,
      otp: code,
    });

    if (error) throw error;
  }
}
