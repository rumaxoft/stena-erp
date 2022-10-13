import { Model } from '@/core/base/model.interface';

export abstract class RoleModel implements Model {
  abstract id: UniqueId;
  abstract createdAt: Date;
  abstract updatedAt: Date;
  abstract title: string;
  abstract description: string;
  abstract isActive: boolean;
  abstract version: number;
}

export class RoleModelImplement implements RoleModel {
  id: UniqueId;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  isActive: boolean;
  version: number;
}
