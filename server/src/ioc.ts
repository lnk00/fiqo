import { Container } from 'inversify';
import type { IOBCoreService } from './modules/openbanking/services/obcore/obcore.interface';
import { TinkOBCoreImplem } from './modules/openbanking/services/obcore/implementations/tink.implem';

export const services: Container = new Container();

type ServiceTypeMap = {
  obcore: IOBCoreService;
};

services.bind<IOBCoreService>('obcore').to(TinkOBCoreImplem);

export function getService<K extends keyof ServiceTypeMap>(
  serviceKey: K,
): ServiceTypeMap[K] {
  return services.get(serviceKey);
}
