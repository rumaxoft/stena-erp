import { UseCase } from '@/core/base/use-case';
import { RoleRepository } from '@/core/repositories/role/repository.interface';
import { DeleteRoleByIdDto } from '@/shared/dtos/role';
import { Result, ok, err } from '@/shared/helpers/result-monad';
import { IFormatErrorMessage } from '@/core/ports/errors/errors.interface';

export class DeleteRoleByIdUseCase
  implements UseCase<string, IFormatErrorMessage>
{
  constructor(private readonly repository: RoleRepository) {}

  public async execute(
    dto: DeleteRoleByIdDto,
  ): Promise<Result<string, IFormatErrorMessage>> {
    try {
      await this.repository.deleteById(dto.id);
      return ok('success');
    } catch (error) {
      return err(error.message);
    }
  }
}
