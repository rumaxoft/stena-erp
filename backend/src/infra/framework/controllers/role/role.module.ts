import { Module } from '@nestjs/common';
import { RoleRepository } from '@/core/repositories/role/repository.interface';
import { RoleController } from './role.controller';
import { TypeormService } from '../../data/typeorm/typeorm.service';
import {
  CreateRoleUseCase,
  DeleteRoleByIdUseCase,
  FindAllRoleUseCase,
  FindRoleByIdUseCase,
  FindRoleByTitleUseCase,
  UpdateRoleTitleUseCase,
} from '@/use-cases/role';
import { RoleTypeormRepository } from '../../data/typeorm/repositories/role/role.repository';
import { UUIDService } from '../../uuid/uuid.service';
import { LoggerService } from '../../logger/logger.service';
import { IUUID } from '@/core/ports/uuid/uuid.interface';
import { ILogger } from '@/core/ports/logger/logger.interface';
import { ErrorService } from '../../errors/error.service';

@Module({
  controllers: [RoleController],
  providers: [
    TypeormService,
    UUIDService,
    LoggerService,
    ErrorService,
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
      provide: CreateRoleUseCase,
      useFactory: (
        repository: RoleRepository,
        uUIDService: IUUID,
        loggerService: ILogger,
      ) => new CreateRoleUseCase(repository, uUIDService, loggerService),
      inject: [RoleTypeormRepository, UUIDService, LoggerService],
    },
    {
      provide: FindAllRoleUseCase,
      useFactory: (repository: RoleRepository) =>
        new FindAllRoleUseCase(repository),
      inject: [RoleTypeormRepository],
    },
    {
      provide: FindRoleByIdUseCase,
      useFactory: (repository: RoleRepository) =>
        new FindRoleByIdUseCase(repository),
      inject: [RoleTypeormRepository],
    },
    {
      provide: FindRoleByTitleUseCase,
      useFactory: (repository: RoleRepository) =>
        new FindRoleByTitleUseCase(repository),
      inject: [RoleTypeormRepository],
    },
    {
      provide: UpdateRoleTitleUseCase,
      useFactory: (repository: RoleRepository, logger: ILogger) =>
        new UpdateRoleTitleUseCase(repository, logger),
      inject: [RoleTypeormRepository, LoggerService],
    },
    {
      provide: DeleteRoleByIdUseCase,
      useFactory: (repository: RoleRepository) =>
        new DeleteRoleByIdUseCase(repository),
      inject: [RoleTypeormRepository],
    },
  ],
})
export class RoleModule {}
