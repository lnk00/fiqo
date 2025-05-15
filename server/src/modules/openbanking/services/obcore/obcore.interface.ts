export interface IOBCoreService {
  createUser: () => Promise<string>;
  createDelegatedAuth: (userId: string, hint: string) => Promise<string>;
}
