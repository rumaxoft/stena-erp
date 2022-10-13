import { UseCase } from '@/core/base/use-case';
import { RoleRepository } from '@/core/repositories/role/repository.interface';
import { RolePresenter, CreateRoleDto } from '@/shared/dtos/role';
import { IUUID } from '@/core/ports/uuid/uuid.interface';
import { ILogger } from '@/core/ports/logger/logger.interface';
import { Result, ok, err } from '@/shared/helpers/result-monad';
import { roleFactory } from '@/core/domain/models/role';
import { errorMessage } from './error';
import { IFormatErrorMessage } from '@/core/ports/errors/errors.interface';

export class CreateRoleUseCase
  implements UseCase<RolePresenter, IFormatErrorMessage>
{
  constructor(
    private readonly repository: RoleRepository,
    private readonly uuid: IUUID,
    private readonly logger: ILogger,
  ) {}

  public async execute(
    role: CreateRoleDto,
  ): Promise<Result<RolePresenter, IFormatErrorMessage>> {
    if (!role.title) {
      return err(errorMessage.NO_TITLE_PROVIDED);
    }
    const date = new Date();
    const modelResult = roleFactory({
      ...role,
      id: this.uuid.getUUID(),
      updatedAt: date,
      createdAt: date,
    });
    if (modelResult.isOk()) {
      const existedRole = await this.repository.findByTitle(role.title);
      if (existedRole) {
        return err(errorMessage.ROLE_WITH_PROVIDED_TITLE_ALREADY_EXISTS);
      }
      this.logger.log(
        'Create role usecase execute',
        `The role ${role.title} created`,
      );
      try {
        const createdRole = await this.repository.insert(
          modelResult.getResult(),
        );
        const createRolePresenter = new RolePresenter(createdRole);
        return ok(createRolePresenter);
      } catch (error) {
        return err(error);
      }
    } else {
      return err(modelResult.getResult());
    }
  }
}
