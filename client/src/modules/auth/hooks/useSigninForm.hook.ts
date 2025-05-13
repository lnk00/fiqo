import { useState } from 'react';
import { useAnimate } from 'motion/react';
import { useNavigate } from '@tanstack/react-router';
import { authClient } from '@/modules/auth/services/auth-client.service';

export function useSigninForm() {
  const [email, setEmail] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [emailFormRef, animateEmailForm] = useAnimate();
  const [otpFormRef, animateOtpForm] = useAnimate();
  const navigate = useNavigate({ from: '/signin' });

  const handleSigninWithEmail = async () => {
    if (!email) return;

    const { data, error } = await authClient.emailOtp.sendVerificationOtp({
      email: email,
      type: 'sign-in',
    });

    if (!error && data) {
      await animateEmailForm(
        emailFormRef.current,
        { y: -20, opacity: 0 },
        { duration: 0.3 },
      );

      setShowOtp(true);
    }
  };

  const handleVerifyOtp = async (value: string) => {
    if (!email) return;

    const { data, error } = await authClient.signIn.emailOtp({
      email: email,
      otp: value,
    });

    if (!error && data) {
      navigate({ to: '/' as never });
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
