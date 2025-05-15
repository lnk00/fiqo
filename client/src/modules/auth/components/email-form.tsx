import { motion } from 'motion/react';
import googleLogo from '../../../assets/google.svg';
import appleLogo from '../../../assets/apple.svg';

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
        className="btn btn-lg btn-primary"
        type="button"
        onClick={handleSigninWithEmail}
      >
        sign-in with email
      </button>
      <div className="divider">OR</div>

      <div className="flex gap-2">
        <button
          className="btn btn-md bg-black text-white border-black flex-1"
          type="button"
        >
          <img src={appleLogo} alt="google" />
          Login with Apple
        </button>
        <button
          className="btn btn-md bg-white text-black border-[#e5e5e5] flex-1"
          type="button"
        >
          <img src={googleLogo} alt="google" />
          Login with Google
        </button>
      </div>
    </motion.div>
  );
}
