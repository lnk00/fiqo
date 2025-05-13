import { motion } from 'motion/react';
import { Input } from '@/modules/shared/components/ui/input';
import { Button } from '@/modules/shared/components/ui/button';

interface EmailFormProps {
  email: string;
  setEmail: (email: string) => void;
  emailFormRef: React.RefObject<HTMLDivElement>;
  handleSigninWithEmail: () => Promise<void>;
}

export function EmailForm({
  email,
  setEmail,
  emailFormRef,
  handleSigninWithEmail,
}: EmailFormProps) {
  return (
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
  );
}