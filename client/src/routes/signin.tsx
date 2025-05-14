import { createFileRoute, redirect } from '@tanstack/react-router';
import { useSigninForm } from '@/modules/auth/hooks/useSigninForm.hook';
import { EmailForm } from '@/modules/auth/components/email-form';
import { OtpForm } from '@/modules/auth/components/otp-form';
import { betterAuthClient } from '@/utils/http/clients/auth.client';

export const Route = createFileRoute('/signin')({
  component: RouteComponent,
  beforeLoad: async () => {
    const { data: session } = await betterAuthClient.getSession();
    if (session) {
      throw redirect({
        to: '/' as never,
      });
    }
  },
});

function RouteComponent() {
  const {
    email,
    setEmail,
    showOtp,
    emailFormRef,
    otpFormRef,
    handleSigninWithEmail,
    handleVerifyOtp,
    handleBackToEmail,
  } = useSigninForm();

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center">
      <div className="w-[900px] h-full px-32 py-16">
        <h1 className="text-4xl font-display absolute">fiqo</h1>
        <div className="h-full w-full flex justify-center flex-col gap-8">
          <div className="flex flex-col gap-1">
            <h2 className="text-5xl font-bold font-display">Sign-in</h2>
            <div className="text-lg text-muted-foreground">
              Enter your email to receive a one-time pass code.
            </div>
          </div>

          {!showOtp && (
            <EmailForm
              email={email}
              setEmail={setEmail}
              emailFormRef={emailFormRef}
              handleSigninWithEmail={handleSigninWithEmail}
            />
          )}

          {showOtp && (
            <OtpForm
              otpFormRef={otpFormRef}
              handleVerifyOtp={handleVerifyOtp}
              handleBackToEmail={handleBackToEmail}
            />
          )}
        </div>
      </div>
      <div className="w-full h-full p-8">
        <div className="bg-muted h-full w-full rounded-2xl" />
      </div>
    </div>
  );
}
