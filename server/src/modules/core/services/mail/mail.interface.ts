export interface IMailService {
  sendOtp: (email: string, code: string) => void;
}
