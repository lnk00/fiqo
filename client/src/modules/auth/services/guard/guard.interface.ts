export interface IGuardService {
  redirectIfNotAuthenticated: () => Promise<void>;
  redirectIfAuthenticated: () => Promise<void>;
}
