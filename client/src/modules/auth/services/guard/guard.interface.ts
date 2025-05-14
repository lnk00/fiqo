export interface IGuardService {
  redirectIfNotAuthenticated: () => void;
  redirectIfAuthenticated: () => void;
}
