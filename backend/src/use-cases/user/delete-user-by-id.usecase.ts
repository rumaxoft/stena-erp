import { UseCase } from '@/core/base/use-case';
import { UserRepository } from '@/core/repositories/user/user.repository.interface';
import { DeleteUserByIdDto } from '@/shared/dtos/user/delete-user-by-id.dto';
import { Result, ok, err } from '@/shared/helpers/result-monad';
import { IFormatErrorMessage } from '@/core/ports/errors/errors.interface';

export class DeleteUserByIdUseCase
  implements UseCase<string, IFormatErrorMessage>
{
  constructor(private readonly repository: UserRepository) {}

  public async execute(
    dto: DeleteUserByIdDto,
  ): Promise<Result<string, IFormatErrorMessage>> {
    try {
      await this.repository.deleteById(dto.id);
      return ok('success');
    } catch (error) {
      return err(error.message);
    }
  }
}
