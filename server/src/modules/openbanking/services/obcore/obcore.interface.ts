export interface IOBCoreService {
  createUser: (userId: string) => Promise<string>;
  createDelegatedAuth: (userId: string, hint: string) => Promise<string>;
}
