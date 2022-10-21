import { UserModel } from '@/core/domain/models/user/user.model';

export interface UserRepository {
  insert(role: UserModel): Promise<UserModel>;
  findById(id: UniqueId): Promise<UserModel | null>;
  findAll(): Promise<UserModel[]>;
  findMany(offset: number, limit: number): Promise<UserModel[]>;
  findByName(name: string): Promise<UserModel[] | null>;
  findByMobile(phone: string): Promise<UserModel | null>;
  findByEmail(phone: string): Promise<UserModel | null>;
  deleteById(id: UniqueId): Promise<void>;
}
