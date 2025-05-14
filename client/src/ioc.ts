import { Container } from 'inversify';
import { TinkImplem } from './modules/bankaccount/services/ob/implementations/tink.implem';
import type { IOBService } from './modules/bankaccount/services/ob/ob.interface';
import { BetterAuthOtpImplem } from './modules/auth/services/otp/implementations/better-auth-otp.implem';
import type { IOtpService } from './modules/auth/services/otp/otp.interface';

export const services: Container = new Container();

type ServiceTypeMap = {
  ob: TinkImplem;
  otp: BetterAuthOtpImplem;
};

services.bind<IOBService>('ob').to(TinkImplem);
services.bind<IOtpService>('otp').to(BetterAuthOtpImplem);

export function getService<K extends keyof ServiceTypeMap>(
  serviceKey: K,
): ServiceTypeMap[K] {
  return services.get(serviceKey);
}
