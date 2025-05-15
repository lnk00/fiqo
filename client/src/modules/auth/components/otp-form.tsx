import { motion } from 'motion/react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/modules/shared/components/ui/input-otp';
import { ArrowLeft } from 'lucide-react';

interface OtpFormProps {
  otpFormRef: React.RefObject<HTMLDivElement>;
  handleVerifyOtp: (value: string) => Promise<void>;
  handleBackToEmail: () => Promise<void>;
}

export function OtpForm({
  otpFormRef,
  handleVerifyOtp,
  handleBackToEmail,
}: OtpFormProps) {
  return (
    <motion.div
      ref={otpFormRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, easing: 'ease-out', delay: 0.2 }}
      className="flex flex-col gap-8 h-[300px]"
    >
      <div className="flex">
        <InputOTP maxLength={6} onComplete={handleVerifyOtp}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="relative flex gap-4">
        <button
          className="btn btn-lg flex-1"
          type="button"
          onClick={handleBackToEmail}
        >
          <ArrowLeft />
          back to email
        </button>
        <button
          className="btn btn-lg btn-neutral flex-1"
          type="button"
          onClick={handleBackToEmail}
        >
          verify
        </button>
      </div>
    </motion.div>
  );
}
