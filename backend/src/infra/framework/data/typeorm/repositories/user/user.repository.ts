import { UserRepository } from '@/core/repositories/user/user.repository.interface';
import { TypeormService } from '../../typeorm.service';
import { UserEntity } from '../../entities/user/user.entity';
import { UserModel } from '@/core/domain/models/user';

export class UserTypeormRepository implements UserRepository {
  constructor(private readonly typeOrmService: TypeormService) {}

  async insert(data: UserModel): Promise<UserModel> {
    return await this.typeOrmService
      .getDbConnection()
      .getRepository(UserEntity)
      .save(data);
  }

  async findById(id: UniqueId): Promise<UserModel | null> {
    return await this.typeOrmService
      .getDbConnection()
      .getRepository(UserEntity)
      .findOne({
        where: {
          id,
        },
        relations: {
          role: true,
        },
      });
  }

  async findAll(): Promise<UserModel[]> {
    return await this.typeOrmService
      .getDbConnection()
      .getRepository(UserEntity)
      .find({
        relations: {
          role: true,
        },
      });
  }

  async findMany(offset: number, limit: number): Promise<UserModel[]> {
    return await this.typeOrmService
      .getDbConnection()
      .getRepository(UserEntity)
      .find({
        skip: offset,
        take: limit,
        relations: {
          role: true,
        },
      });
  }

  async findByName(name: string): Promise<UserModel[]> {
    return await this.typeOrmService
      .getDbConnection()
      .getRepository(UserEntity)
      .find({
        where: {
          name,
        },
        relations: {
          role: true,
        },
      });
  }

  async findByMobile(mobile: string): Promise<UserModel> {
    return await this.typeOrmService
      .getDbConnection()
      .getRepository(UserEntity)
      .findOne({
        where: {
          mobile,
        },
        relations: {
          role: true,
        },
      });
  }

  async findByEmail(email: string): Promise<UserModel> {
    return await this.typeOrmService
      .getDbConnection()
      .getRepository(UserEntity)
      .findOne({
        where: {
          email,
        },
        relations: {
          role: true,
        },
      });
  }

  async deleteById(id: UniqueId): Promise<void> {
    await this.typeOrmService
      .getDbConnection()
      .getRepository(UserEntity)
      .delete({ id });
  }
}
