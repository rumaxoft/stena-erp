import { UseCase } from '@/core/base/use-case';
import { RoleRepository } from '@/core/repositories/role/repository.interface';
import { FindRoleByIdDto, RolePresenter } from '@/shared/dtos/role';
import { Result, ok, err } from '@/shared/helpers/result-monad';
import { IFormatErrorMessage } from '@/core/ports/errors/errors.interface';
import { RoleModel } from '@/core/domain/models/role';
import { errorMessage } from './error';

export class FindRoleByIdUseCase
  implements UseCase<RolePresenter, IFormatErrorMessage>
{
  constructor(private readonly repository: RoleRepository) {}

  public async execute(
    dto: FindRoleByIdDto,
  ): Promise<Result<RolePresenter, IFormatErrorMessage>> {
    try {
      const existedRole: RoleModel | null = await this.repository.findById(
        dto.id,
      );
      if (existedRole) {
        const rolePresenter = new RolePresenter(existedRole);
        return ok(rolePresenter);
      } else {
        return err(errorMessage.ROLE_NOT_FOUND);
      }
    } catch (error) {
      return err(error.message);
    }
  }
}
