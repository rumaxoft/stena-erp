import { UseCase } from '@/core/base/use-case';
import { UserRepository } from '@/core/repositories/user/user.repository.interface';
import { UsersPresenter, UserPresenter } from '@/shared/dtos/user';
import { Result, ok, err } from '@/shared/helpers/result-monad';
import { IFormatErrorMessage } from '@/core/ports/errors/errors.interface';
import { FindUserByNameDto } from '@/shared/dtos/user';

export class FindUserByNameUseCase
  implements UseCase<UsersPresenter, IFormatErrorMessage>
{
  constructor(private readonly repository: UserRepository) {}

  public async execute(
    dto: FindUserByNameDto,
  ): Promise<Result<UsersPresenter | null, IFormatErrorMessage>> {
    try {
      const existedUsers = await this.repository.findByName(dto.name);
      const usersPresenter: UsersPresenter = existedUsers.map((user) => {
        const userPresenter = new UserPresenter(user);
        return userPresenter;
      });
      return ok(usersPresenter);
    } catch (error) {
      return err(error.message);
    }
  }
}
