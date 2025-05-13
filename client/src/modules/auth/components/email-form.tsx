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
      <Button onClick={handleSigninWithEmail}>sign-in with email</Button>
    </motion.div>
  );
}
