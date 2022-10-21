import { UseCase } from '@/core/base/use-case';
import { UserRepository } from '@/core/repositories/user/user.repository.interface';
import { IUUID } from '@/core/ports/uuid/uuid.interface';
import { ILogger } from '@/core/ports/logger/logger.interface';
import { IHashService } from '@/core/ports/hash/hash.interface';
import { Result, ok, err } from '@/shared/helpers/result-monad';
import { userFactory, UserModel } from '@/core/domain/models/user';
import { errorMessage } from './error';
import { IFormatErrorMessage } from '@/core/ports/errors/errors.interface';
import { UserPresenter } from '@/shared/dtos/user/user.presenter';
import { CreateUserDto } from '@/shared/dtos/user/create-user.dto';
import { RoleRepository } from '@/core/repositories/role/repository.interface';
import { FORBIDDEN_ROLE } from './forbiddenRoles';

export class CreateUserUseCase
  implements UseCase<UserPresenter, IFormatErrorMessage>
{
  constructor(
    private readonly repository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly uuid: IUUID,
    private readonly logger: ILogger,
    private readonly hash: IHashService,
  ) {}

  public async execute(
    userDto: CreateUserDto,
  ): Promise<Result<UserPresenter, IFormatErrorMessage>> {
    if (!userDto.name) {
      return err(errorMessage.NO_NAME_PROVIDED);
    }
    if (!userDto.roleId) {
      return err(errorMessage.NO_ROLE_ID_PROVIDED);
    }

    const roleModel = await this.roleRepository.findById(userDto.roleId);
    if (!roleModel) return err(errorMessage.USER_ROLE_NOT_FOUND);
    if (roleModel.title === FORBIDDEN_ROLE)
      return err(errorMessage.CREATING_USER_WITH_PROVIDED_ROLE_IS_FORBIDDEN);
    if (userDto.email) {
      const foundByEmail: UserModel = await this.repository.findByEmail(
        userDto.email,
      );
      if (foundByEmail) {
        return err(errorMessage.USER_WITH_PROVIDED_EMAIL_ALREADY_EXISTS);
      }
    }

    if (userDto.mobile) {
      const foundByMobile: UserModel = await this.repository.findByMobile(
        userDto.mobile,
      );
      if (foundByMobile) {
        return err(errorMessage.USER_WITH_PROVIDED_MOBILE_ALREADY_EXISTS);
      }
    }

    let hashedPassword: string | null = null;
    let salt: string | null = null;
    if (userDto.password && !userDto.email && !userDto.mobile) {
      return err(errorMessage.CANT_SET_PASSWORD_IF_NO_EMAIL_OR_MOBILE);
    }
    if ((userDto.email || userDto.mobile) && userDto.password) {
      if (userDto.password.length < 8) {
        return err(errorMessage.PASSWORD_IS_NOT_VALID);
      }
      salt = await this.hash.getSalt();
      hashedPassword = await this.hash.hash(userDto.password, salt);
    }
    const date = new Date();
    const modelResult = userFactory({
      ...userDto,
      id: this.uuid.getUUID(),
      updatedAt: date,
      createdAt: date,
      hashedPassword,
      salt,
      role: roleModel,
    });
    if (modelResult.isOk()) {
      this.logger.log(
        'Create user usecase execute',
        `The user ${userDto.name} created`,
      );
      try {
        const createdUser = await this.repository.insert(
          modelResult.getResult(),
        );
        const createdUserPresenter = new UserPresenter(createdUser);
        return ok(createdUserPresenter);
      } catch (error) {
        return err(error);
      }
    } else {
      return err(modelResult.getResult());
    }
  }
}
