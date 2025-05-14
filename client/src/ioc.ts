import { Container } from 'inversify';
import { TinkImplem } from './modules/bankaccount/services/ob/implementations/tink.implem';
import type { IOBService } from './modules/bankaccount/services/ob/ob.interface';

export const services: Container = new Container();

export const SERVICES = {
  OBService: Symbol.for('OBService'),
};

interface ServiceIdentifierMap {
  [SERVICES.OBService]: TinkImplem;
}

services.bind<IOBService>(SERVICES.OBService).to(TinkImplem);

export function getService<K extends keyof ServiceIdentifierMap>(
  id: K,
): ServiceIdentifierMap[K] {
  return services.get<ServiceIdentifierMap[K]>(id);
}
