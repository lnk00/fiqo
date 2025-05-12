import type { auth } from '@server/modules/auth/services/auth.service';

export type HonoContextType = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};
