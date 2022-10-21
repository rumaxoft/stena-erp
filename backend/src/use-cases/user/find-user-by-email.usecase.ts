import { UseCase } from '@/core/base/use-case';
import { UserRepository } from '@/core/repositories/user/user.repository.interface';
import { UserPresenter } from '@/shared/dtos/user';
import { Result, ok, err } from '@/shared/helpers/result-monad';
import { IFormatErrorMessage } from '@/core/ports/errors/errors.interface';
import { UserModel } from '@/core/domain/models/user';
import { FindUserByEmailDto } from '@/shared/dtos/user';

export class FindUserByEmailUseCase
  implements UseCase<UserPresenter, IFormatErrorMessage>
{
  constructor(private readonly repository: UserRepository) {}

  public async execute(
    dto: FindUserByEmailDto,
  ): Promise<Result<UserPresenter | null, IFormatErrorMessage>> {
    try {
      const existedUser: UserModel | null = await this.repository.findByEmail(
        dto.email,
      );
      if (existedUser) {
        const userPresenter = new UserPresenter(existedUser);
        return ok(userPresenter);
      } else {
        return ok(null);
      }
    } catch (error) {
      return err(error.message);
    }
  }
}
