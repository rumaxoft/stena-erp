import { UseCase } from '@/core/base/use-case';
import { RoleRepository } from '@/core/repositories/role/repository.interface';
import { RolePresenter, UpdateRoleTitleDto } from '@/shared/dtos/role';
import { ILogger } from '@/core/ports/logger/logger.interface';
import { Result, ok, err } from '@/shared/helpers/result-monad';
import { roleFactory, RoleModel } from '@/core/domain/models/role';
import { errorMessage } from './error';
import { IFormatErrorMessage } from '@/core/ports/errors/errors.interface';

export class UpdateRoleTitleUseCase
  implements UseCase<RolePresenter, IFormatErrorMessage>
{
  constructor(
    private readonly repository: RoleRepository,
    private readonly logger: ILogger,
  ) {}

  public async execute(
    role: UpdateRoleTitleDto,
  ): Promise<Result<RolePresenter, IFormatErrorMessage>> {
    const existedRole = await this.repository.findById(role.id);
    if (!existedRole) {
      return err(errorMessage.ROLE_NOT_FOUND);
    }
    this.logger.log(
      'Update role title usecase execute',
      `The role ${existedRole.title} updated to ${role.title}`,
    );
    const date = new Date();
    const modelResult: Result<RoleModel, IFormatErrorMessage> = roleFactory({
      ...existedRole,
      title: role.title,
      updatedAt: date,
      version: ++existedRole.version,
    });
    if (modelResult.isOk()) {
      try {
        const updatedRole = await this.repository.insert(
          modelResult.getResult(),
        );
        const rolePresenter = new RolePresenter(updatedRole);
        return ok(rolePresenter);
      } catch (error) {
        return err(error);
      }
    } else {
      return err(modelResult.getResult());
    }
  }
}
