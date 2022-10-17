import { RoleModel } from '@/core/domain/models/role';

export interface RoleRepository {
  insert(role: RoleModel): Promise<RoleModel>;
  findById(id: UniqueId): Promise<RoleModel | null>;
  findAll(): Promise<RoleModel[]>;
  findByTitle(title: string): Promise<RoleModel | null>;
  deleteById(id: UniqueId): Promise<void>;
}
