import { Container } from 'inversify';
import type { IOBCoreService } from './modules/openbanking/services/obcore/obcore.interface';
import { TinkOBCoreImplem } from './modules/openbanking/services/obcore/implementations/tink.implem';
import type { IMailService } from './modules/core/services/mail/mail.interface';
import { ResendImplem } from './modules/core/services/mail/implementations/resend.implem';

export const services: Container = new Container();

type ServiceTypeMap = {
  obcore: IOBCoreService;
  mail: IMailService;
};

services.bind<IOBCoreService>('obcore').to(TinkOBCoreImplem);
services.bind<IMailService>('mail').to(ResendImplem);

export function getService<K extends keyof ServiceTypeMap>(
  serviceKey: K,
): ServiceTypeMap[K] {
  return services.get(serviceKey);
}
