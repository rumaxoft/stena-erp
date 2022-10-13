import { RoleRepository } from '@/core/repositories/role/repository.interface';
import { TypeormService } from '../../typeorm.service';
import { RoleEntity } from '../../entities/role/role.entity';
import { RoleModel } from '@/core/domain/models/role';

export class RoleTypeormRepository implements RoleRepository {
  constructor(private readonly typeormService: TypeormService) {}

  async insert(data: RoleModel): Promise<RoleModel> {
    return await this.typeormService
      .getDbConnection()
      .getRepository(RoleEntity)
      .save(data);
  }

  async findById(id: UniqueId): Promise<RoleModel | null> {
    return await this.typeormService
      .getDbConnection()
      .getRepository(RoleEntity)
      .findOneBy({
        id,
      });
  }

  async findAll(): Promise<RoleModel[]> {
    return await this.typeormService
      .getDbConnection()
      .getRepository(RoleEntity)
      .find();
  }

  async findByTitle(title: string): Promise<RoleModel> {
    return await this.typeormService
      .getDbConnection()
      .getRepository(RoleEntity)
      .findOneBy({ title });
  }

  async deleteById(id: UniqueId): Promise<void> {
    await this.typeormService
      .getDbConnection()
      .getRepository(RoleEntity)
      .delete({ id });
  }
}
