import { UseCase } from '@/core/base/use-case';
import { UserRepository } from '@/core/repositories/user/user.repository.interface';
import {
  UsersPresenter,
  UserPresenter,
  FindManyUserDto,
} from '@/shared/dtos/user';
import { Result, ok, err } from '@/shared/helpers/result-monad';
import { IFormatErrorMessage } from '@/core/ports/errors/errors.interface';
import { UserModel } from '@/core/domain/models/user';

export class FindManyUserUseCase
  implements UseCase<UsersPresenter, IFormatErrorMessage>
{
  constructor(private readonly repository: UserRepository) {}

  public async execute(
    findManyDto: FindManyUserDto,
  ): Promise<Result<UsersPresenter, IFormatErrorMessage>> {
    let existedUsers: UserModel[];
    try {
      existedUsers = await this.repository.findMany(
        findManyDto.offset,
        findManyDto.limit,
      );
    } catch (error) {
      return err(error.message);
    }
    const usersPresenter: UsersPresenter = existedUsers.map((user) => {
      const userPresenter = new UserPresenter(user);
      return userPresenter;
    });
    return ok(usersPresenter);
  }
}
