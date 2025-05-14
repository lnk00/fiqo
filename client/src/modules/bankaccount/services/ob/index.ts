import { TinkImplem } from './implementations/tink.implem';
import type { IOBService } from './ob.interface';

export const OBService: IOBService = new TinkImplem();
