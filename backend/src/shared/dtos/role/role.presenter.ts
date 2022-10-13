import { RoleModel } from '@/core/domain/models/role/role.model';
export class RolePresenter {
  id: UniqueId;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  isActive: boolean;
  description: string;

  constructor(role: RoleModel) {
    this.id = role.id;
    this.createdAt = role.createdAt;
    this.updatedAt = role.updatedAt;
    this.title = role.title;
    this.isActive = role.isActive;
    this.description = role.description;
  }
}
