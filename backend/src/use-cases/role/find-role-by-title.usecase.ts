import { UseCase } from '@/core/base/use-case';
import { RoleRepository } from '@/core/repositories/role/repository.interface';
import { FindRoleByTitleDto, RolePresenter } from '@/shared/dtos/role';
import { Result, ok, err } from '@/shared/helpers/result-monad';
import { IFormatErrorMessage } from '@/core/ports/errors/errors.interface';
import { RoleModel } from '@/core/domain/models/role';
import { errorMessage } from './error';

export class FindRoleByTitleUseCase
  implements UseCase<RolePresenter, IFormatErrorMessage>
{
  constructor(private readonly repository: RoleRepository) {}

  public async execute(
    dto: FindRoleByTitleDto,
  ): Promise<Result<RolePresenter, IFormatErrorMessage>> {
    if (dto?.title) {
      try {
        const existedRole: RoleModel | null = await this.repository.findByTitle(
          dto.title,
        );
        if (existedRole) {
          const rolePresenter = new RolePresenter(existedRole);
          return ok(rolePresenter);
        }
        return err(errorMessage.ROLE_NOT_FOUND);
      } catch (error) {
        return err(error.message);
      }
    } else {
      return err(errorMessage.NO_TITLE_PROVIDED);
    }
  }
}
