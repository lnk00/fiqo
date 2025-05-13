import { motion } from 'motion/react';
import { Button } from '@/modules/shared/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/modules/shared/components/ui/input-otp';

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
      <div className="flex gap-4">
        <Button
          className="flex-1"
          variant="outline"
          onClick={handleBackToEmail}
        >
          Back to email
        </Button>
        <Button className="flex-1">Verify</Button>
      </div>
    </motion.div>
  );
}