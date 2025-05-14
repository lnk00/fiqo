import { Container } from 'inversify';
import { TinkImplem } from './modules/bankaccount/services/ob/implementations/tink.implem';
import type { IOBService } from './modules/bankaccount/services/ob/ob.interface';

export const services: Container = new Container();

type ServiceTypeMap = {
  ob: TinkImplem;
};

services.bind<IOBService>('ob').to(TinkImplem);

export function getService<K extends keyof ServiceTypeMap>(
  serviceKey: K,
): ServiceTypeMap[K] {
  return services.get(serviceKey);
}
