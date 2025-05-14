export interface IOtpService {
  sendOtpMail: (email: string) => void;
  sendOtpVerification: (email: string, code: string) => void;
}
