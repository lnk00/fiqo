import { useState } from 'react';
import { useAnimate } from 'motion/react';
import { useNavigate } from '@tanstack/react-router';
import { getService } from '@/ioc';

export function useSigninForm() {
  const [email, setEmail] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [emailFormRef, animateEmailForm] = useAnimate();
  const [otpFormRef, animateOtpForm] = useAnimate();
  const navigate = useNavigate({ from: '/signin' });
  const otpService = getService('otp');

  const handleSigninWithEmail = async () => {
    if (!email) return;

    try {
      await otpService.sendOtpMail(email);

      await animateEmailForm(
        emailFormRef.current,
        { y: -20, opacity: 0 },
        { duration: 0.3 },
      );

      setShowOtp(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleVerifyOtp = async (value: string) => {
    if (!email) return;

    try {
      await otpService.sendOtpVerification(email, value);

      navigate({ to: '/' as never });
    } catch (e) {
      console.log(e);
    }
  };

  const handleBackToEmail = async () => {
    await animateOtpForm(
      otpFormRef.current,
      { y: -20, opacity: 0 },
      { duration: 0.3 },
    );

    setShowOtp(false);
  };

  return {
    email,
    setEmail,
    showOtp,
    emailFormRef,
    otpFormRef,
    handleSigninWithEmail,
    handleVerifyOtp,
    handleBackToEmail,
  };
}
