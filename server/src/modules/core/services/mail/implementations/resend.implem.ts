import { injectable } from 'inversify';
import type { IMailService } from '../mail.interface';
import { Resend } from 'resend';

@injectable()
export class ResendImplem implements IMailService {
  sendOtp(email: string, code: string) {
    const resend = new Resend(process.env.RESEND_KEY);

    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: `fiqo - ${code} is your verification code`,
      html: `<p>Enter the following verification code when prompted: ${code}</p>`,
    });
  }
}
