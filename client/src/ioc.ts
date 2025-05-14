import { Container } from 'inversify';
import { TinkImplem } from './modules/bankaccount/services/ob/implementations/tink.implem';
import type { IOBService } from './modules/bankaccount/services/ob/ob.interface';
import { BetterAuthOtpImplem } from './modules/auth/services/otp/implementations/better-auth-otp.implem';
import type { IOtpService } from './modules/auth/services/otp/otp.interface';
import { BetterAuthGuardImplem } from './modules/auth/services/guard/implementations/better-auth-guard.implem';
import type { IGuardService } from './modules/auth/services/guard/guard.interface';
import type { ISessionService } from './modules/auth/services/session/session.interface';
import { BetterAuthSessionImplem } from './modules/auth/services/session/implementations/better-auth-session.implem';

export const services: Container = new Container();

type ServiceTypeMap = {
  ob: IOBService;
  otp: IOtpService;
  guard: IGuardService;
  session: ISessionService;
};

services.bind<IOBService>('ob').to(TinkImplem);
services.bind<IOtpService>('otp').to(BetterAuthOtpImplem);
services.bind<IGuardService>('guard').to(BetterAuthGuardImplem);
services.bind<ISessionService>('session').to(BetterAuthSessionImplem);

export function getService<K extends keyof ServiceTypeMap>(
  serviceKey: K,
): ServiceTypeMap[K] {
  return services.get(serviceKey);
}
