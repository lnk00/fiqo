import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { motion, useAnimate } from 'motion/react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

export const Route = createFileRoute('/signin')({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [emailFormRef, animateEmailForm] = useAnimate();
  const [otpFormRef, animateOtpForm] = useAnimate();

  const handleSigninWithEmail = async () => {
    if (!email) return;

    const { data, error } = await authClient.emailOtp.sendVerificationOtp({
      email: email,
      type: 'sign-in',
    });

    console.log('DATA: ', data);
    console.log('ERROR: ', error);

    await animateEmailForm(
      emailFormRef.current,
      { y: -20, opacity: 0 },
      { duration: 0.3 },
    );

    setShowOtp(true);
  };

  const handleVerifyOtp = async (value: string) => {
    console.log('OTP value:', value);
  };

  const handleBackToEmail = async () => {
    await animateOtpForm(
      otpFormRef.current,
      { y: -20, opacity: 0 },
      { duration: 0.3 },
    );

    setShowOtp(false);
  };

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center">
      <div className="w-[900px] h-full px-32 py-16">
        <h1 className="text-4xl font-display absolute">fiqo</h1>
        <div className="h-full w-full flex justify-center flex-col gap-8">
          <div className="flex flex-col gap-1">
            <h2 className="text-5xl font-bold font-display">Welcome back</h2>
            <div className="text-lg text-muted-foreground pl-2">
              Enter your email to receive a one-time pass code.
            </div>
          </div>

          {!showOtp && (
            <motion.div
              ref={emailFormRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, easing: 'ease-out', delay: 0.2 }}
              className="flex flex-col gap-4 h-[300px]"
            >
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button onClick={handleSigninWithEmail}>
                sign-in with email
              </Button>

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="flex gap-4">
                <Button className="flex-1">sign-in with apple</Button>
                <Button className="flex-1">sign-in with google</Button>
              </div>
            </motion.div>
          )}

          {showOtp && (
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
          )}
        </div>
      </div>
      <div className="w-full h-full p-8">
        <div className="bg-muted h-full w-full rounded-2xl" />
      </div>
    </div>
  );
}
