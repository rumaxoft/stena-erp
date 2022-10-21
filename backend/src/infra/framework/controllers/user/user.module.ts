import { Module } from '@nestjs/common';
import { UserRepository } from '@/core/repositories/user/user.repository.interface';
import { UserController } from './user.controller';
import { TypeormService } from '../../data/typeorm/typeorm.service';
import {
  CreateUserUseCase,
  DeleteUserByIdUseCase,
  FindAllUserUseCase,
  FindManyUserUseCase,
  FindUserByEmailUseCase,
  FindUserByIdUseCase,
  FindUserByMobileUseCase,
  FindUserByNameUseCase,
  UpdateUserUseCase,
} from '@/use-cases/user';
import { UserTypeormRepository } from '../../data/typeorm/repositories/user/user.repository';
import { UUIDService } from '../../uuid/uuid.service';
import { LoggerService } from '../../logger/logger.service';
import { IUUID } from '@/core/ports/uuid/uuid.interface';
import { ILogger } from '@/core/ports/logger/logger.interface';
import { ErrorService } from '../../errors/error.service';
import { IHashService } from '@/core/ports/hash/hash.interface';
import { HashService } from '../../hash/hash.service';
import { RoleTypeormRepository } from '../../data/typeorm/repositories/role/role.repository';
import { RoleRepository } from '@/core/repositories/role/repository.interface';

@Module({
  controllers: [UserController],
  providers: [
    TypeormService,
    UUIDService,
    LoggerService,
    ErrorService,
    HashService,
    {
      provide: UserTypeormRepository,
      useFactory: (typeormService: TypeormService) =>
        new UserTypeormRepository(typeormService),
      inject: [TypeormService],
    },
    {
      provide: RoleTypeormRepository,
      useFactory: (typeormService: TypeormService) =>
        new RoleTypeormRepository(typeormService),
      inject: [TypeormService],
    },
    {
      provide: UUIDService,
      useFactory: () => new UUIDService(),
    },
    {
      provide: HashService,
      useFactory: () => new HashService(),
    },
    {
      provide: CreateUserUseCase,
      useFactory: (
        repository: UserRepository,
        roleRepository: RoleRepository,
        uUIDService: IUUID,
        loggerService: ILogger,
        hashService: IHashService,
      ) =>
        new CreateUserUseCase(
          repository,
          roleRepository,
          uUIDService,
          loggerService,
          hashService,
        ),
      inject: [
        UserTypeormRepository,
        RoleTypeormRepository,
        UUIDService,
        LoggerService,
        HashService,
      ],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (
        repository: UserRepository,
        roleRepository: RoleRepository,
        loggerService: ILogger,
        hashService: IHashService,
      ) =>
        new UpdateUserUseCase(
          repository,
          roleRepository,
          loggerService,
          hashService,
        ),
      inject: [
        UserTypeormRepository,
        RoleTypeormRepository,
        LoggerService,
        HashService,
      ],
    },
    {
      provide: FindAllUserUseCase,
      useFactory: (repository: UserRepository) =>
        new FindAllUserUseCase(repository),
      inject: [UserTypeormRepository],
    },
    {
      provide: FindManyUserUseCase,
      useFactory: (repository: UserRepository) =>
        new FindManyUserUseCase(repository),
      inject: [UserTypeormRepository],
    },
    {
      provide: FindUserByIdUseCase,
      useFactory: (repository: UserRepository) =>
        new FindUserByIdUseCase(repository),
      inject: [UserTypeormRepository],
    },
    {
      provide: FindUserByEmailUseCase,
      useFactory: (repository: UserRepository) =>
        new FindUserByEmailUseCase(repository),
      inject: [UserTypeormRepository],
    },
    {
      provide: FindUserByNameUseCase,
      useFactory: (repository: UserRepository) =>
        new FindUserByNameUseCase(repository),
      inject: [UserTypeormRepository],
    },
    {
      provide: FindUserByMobileUseCase,
      useFactory: (repository: UserRepository) =>
        new FindUserByMobileUseCase(repository),
      inject: [UserTypeormRepository],
    },
    {
      provide: DeleteUserByIdUseCase,
      useFactory: (repository: UserRepository) =>
        new DeleteUserByIdUseCase(repository),
      inject: [UserTypeormRepository],
    },
  ],
})
export class UserModule {}
