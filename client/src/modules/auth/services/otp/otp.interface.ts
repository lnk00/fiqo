export interface IOtpService {
  sendOtpMail: (email: string) => Promise<void>;
  sendOtpVerification: (email: string, code: string) => Promise<void>;
}
