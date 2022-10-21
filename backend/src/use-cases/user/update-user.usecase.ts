import { UseCase } from '@/core/base/use-case';
import { UserRepository } from '@/core/repositories/user/user.repository.interface';
import { ILogger } from '@/core/ports/logger/logger.interface';
import { IHashService } from '@/core/ports/hash/hash.interface';
import { Result, ok, err } from '@/shared/helpers/result-monad';
import { userFactory, UserModelImplement } from '@/core/domain/models/user';
import { errorMessage } from './error';
import { IFormatErrorMessage } from '@/core/ports/errors/errors.interface';
import { UserPresenter } from '@/shared/dtos/user/user.presenter';
import { RoleRepository } from '@/core/repositories/role/repository.interface';
import { FORBIDDEN_ROLE } from './forbiddenRoles';
import { UpdateUserDto } from '@/shared/dtos/user';

export class UpdateUserUseCase
  implements UseCase<UserPresenter, IFormatErrorMessage>
{
  constructor(
    private readonly repository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly logger: ILogger,
    private readonly hash: IHashService,
  ) {}

  public async execute(
    userDto: UpdateUserDto,
  ): Promise<Result<UserPresenter, IFormatErrorMessage>> {
    if (!userDto.id) {
      return err(errorMessage.NO_USER_ID_PROVIDED);
    }

    let roleModel;

    if (userDto.roleId) {
      roleModel = await this.roleRepository.findById(userDto.roleId);
      if (!roleModel) return err(errorMessage.PROVIDED_ROLE_ID_NOT_FOUND);
      if (roleModel.title === FORBIDDEN_ROLE) {
        return err(errorMessage.SETTING_PROVIDED_ROLE_TO_USER_IS_FORBIDDEN);
      }
    }

    const existedUser = await this.repository.findById(userDto.id);
    if (!existedUser) {
      return err(errorMessage.USER_NOT_FOUND);
    }

    if (
      (userDto.email ||
        userDto.mobile ||
        existedUser.email ||
        existedUser.mobile) &&
      userDto.password
    ) {
      return err(errorMessage.CANT_SET_PASSWORD_IF_NO_EMAIL_OR_MOBILE);
    }

    let hashedPassword: string | null = null;
    let salt: string | null = null;

    if (
      (userDto.email ||
        userDto.mobile ||
        existedUser.email ||
        existedUser.mobile) &&
      userDto.password
    ) {
      if (userDto.password.length < 8) {
        return err(errorMessage.PASSWORD_IS_NOT_VALID);
      }
      salt = await this.hash.getSalt();
      hashedPassword = await this.hash.hash(userDto.password, salt);
    }

    const date = new Date();

    const modelResult: Result<UserModelImplement, IFormatErrorMessage> =
      userFactory({
        ...existedUser,
        ...userDto,
        email: userDto.email ? userDto.email : existedUser.email,
        mobile: userDto.mobile ? userDto.mobile : existedUser.mobile,
        updatedAt: date,
        version: ++existedUser.version,
        hashedPassword: userDto.password
          ? hashedPassword
          : existedUser.hashedPassword,
        salt: userDto.password ? salt : existedUser.salt,
        role: userDto.roleId ? roleModel : existedUser.role,
      });

    if (modelResult.isOk()) {
      this.logger.log(
        'Update user usecase execute',
        `The user ${userDto.name} updated`,
      );
      const model: UserModelImplement = modelResult.getResult();
      if (userDto.email !== model.email) {
        model.setEmailVerified(false);
      }
      if (userDto.mobile !== model.mobile) {
        model.setMobileVerified(false);
      }
      try {
        const updatedUser = await this.repository.insert(model);
        const updatedUserPresenter = new UserPresenter(updatedUser);
        return ok(updatedUserPresenter);
      } catch (error) {
        return err(error);
      }
    } else {
      return err(modelResult.getResult());
    }
  }
}
