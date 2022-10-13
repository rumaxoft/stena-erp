import { randomUUID } from 'crypto';
import { IUUID } from '@/core/ports/uuid/uuid.interface';

export class UUIDService implements IUUID {
  getUUID() {
    return randomUUID();
  }
}
