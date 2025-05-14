import { Container } from 'inversify';
import { TinkImplem } from './modules/bankaccount/services/ob/implementations/tink.implem';
import type { IOBService } from './modules/bankaccount/services/ob/ob.interface';
import { BetterAuthOtpImplem } from './modules/auth/services/otp/implementations/better-auth-otp.implem';
import type { IOtpService } from './modules/auth/services/otp/otp.interface';
import { BetterAuthGuardImplem } from './modules/auth/services/guard/implementations/better-auth-guard.implem';
import type { IGuardService } from './modules/auth/services/guard/guard.interface';

export const services: Container = new Container();

type ServiceTypeMap = {
  ob: TinkImplem;
  otp: BetterAuthOtpImplem;
  guard: BetterAuthGuardImplem;
};

services.bind<IOBService>('ob').to(TinkImplem);
services.bind<IOtpService>('otp').to(BetterAuthOtpImplem);
services.bind<IGuardService>('guard').to(BetterAuthGuardImplem);

export function getService<K extends keyof ServiceTypeMap>(
  serviceKey: K,
): ServiceTypeMap[K] {
  return services.get(serviceKey);
}
