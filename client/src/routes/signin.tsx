import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/signin')({
  component: RouteComponent,
});

function RouteComponent() {
  const handleSigninWithEmail = async () => {
    const { data, error } = await authClient.emailOtp.sendVerificationOtp({
      email: 'user-email@email.com',
      type: 'sign-in',
    });

    console.log('DATA: ', data);
    console.log('ERROR: ', error);
  };

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center">
      <div className="w-[900px] h-full px-32 py-16">
        <h1 className="text-4xl font-display absolute">fiqo</h1>
        <div className="h-full w-full flex justify-center flex-col gap-8">
          <div className="flex flex-col gap-1">
            <h2 className="text-5xl font-bold font-display">Welcome back</h2>
            <div className="text-lg text-muted-foreground pl-2">
              Enter you email to receive a one time pass code.
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Input type="email" placeholder="Email" />
            <Button onClick={handleSigninWithEmail}>sign-in with email</Button>
          </div>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <div className="flex gap-4">
            <Button className="flex-1">sign-in with apple</Button>
            <Button className="flex-1">sign-in with google</Button>
          </div>
        </div>
      </div>
      <div className="w-full h-full p-8">
        <div className="bg-muted h-full w-full rounded-2xl" />
      </div>
    </div>
  );
}
