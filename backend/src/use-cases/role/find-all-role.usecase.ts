import { UseCase } from '@/core/base/use-case';
import { RoleRepository } from '@/core/repositories/role/repository.interface';
import { RolesPresenter, RolePresenter } from '@/shared/dtos/role';
import { Result, ok, err } from '@/shared/helpers/result-monad';
import { IFormatErrorMessage } from '@/core/ports/errors/errors.interface';
import { RoleModel } from '@/core/domain/models/role';

export class FindAllRoleUseCase
  implements UseCase<RolesPresenter, IFormatErrorMessage>
{
  constructor(private readonly repository: RoleRepository) {}

  public async execute(): Promise<Result<RolesPresenter, IFormatErrorMessage>> {
    let existedRoles: RoleModel[];
    try {
      existedRoles = await this.repository.findAll();
    } catch (error) {
      return err(error.message);
    }
    const rolesPresenter: RolesPresenter = existedRoles.map((role) => {
      const rolePresenter = new RolePresenter(role);
      return rolePresenter;
    });
    return ok(rolesPresenter);
  }
}
