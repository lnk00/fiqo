export interface ISessionService {
  signout: (options?: { onSuccess?: () => void }) => Promise<void>;
}
