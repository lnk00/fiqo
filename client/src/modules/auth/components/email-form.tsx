import { motion } from 'motion/react';

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
      <input
        type="email"
        placeholder="Email"
        className="input input-lg w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="btn btn-lg btn-neutral"
        type="button"
        onClick={handleSigninWithEmail}
      >
        sign-in with email
      </button>
    </motion.div>
  );
}
