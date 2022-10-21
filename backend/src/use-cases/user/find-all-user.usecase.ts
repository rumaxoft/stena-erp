import { UseCase } from '@/core/base/use-case';
import { UserRepository } from '@/core/repositories/user/user.repository.interface';
import { UsersPresenter, UserPresenter } from '@/shared/dtos/user';
import { Result, ok, err } from '@/shared/helpers/result-monad';
import { IFormatErrorMessage } from '@/core/ports/errors/errors.interface';

export class FindAllUserUseCase
  implements UseCase<UsersPresenter, IFormatErrorMessage>
{
  constructor(private readonly repository: UserRepository) {}

  public async execute(): Promise<Result<UsersPresenter, IFormatErrorMessage>> {
    try {
      const existedUsers = await this.repository.findAll();
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
