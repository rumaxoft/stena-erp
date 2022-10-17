import { RoleModel } from '../role/role.model';
import { UserModelImplement } from './user.model';
import { Result, ok, err } from '@/shared/helpers/result-monad';
import { isUUID, isEmail, isHash } from '@/shared/helpers/validation';
import { errorMessage } from '../role/error';
import { IFormatErrorMessage } from '@/core/ports/errors/errors.interface';

export type userFactoryArgs = {
  id: UniqueId;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  middleName?: string;
  lastName?: string;
  additionalInfo?: string;
  email?: Email;
  mobile?: Phone;
  hashedPassword?: HashedPassword;
  version?: number;
  role: RoleModel;
};
export function roleFactory({
  id,
  createdAt,
  updatedAt,
  name,
  middleName = null,
  additionalInfo = null,
  email = null,
  mobile = null,
  hashedPassword = null,
  version = 1,
  role,
}: userFactoryArgs): Result<UserModelImplement, IFormatErrorMessage> {
  const user = new UserModelImplement();

  if (!isUUID(id, 4)) {
    return err(errorMessage.ID_IS_NOT_VALID);
  }

  if (email && !isEmail(email)) {
    return err(errorMessage.EMAIL_IS_NOT_VALID);
  }

  if (hashedPassword && !isHash(hashedPassword, 'sha512')) {
    return err(errorMessage.PASSWORD_IS_NOT_HASH);
  }

  user.id = id;
  user.createdAt = createdAt;
  user.updatedAt = updatedAt;
  user.name = name;
  user.middleName = middleName;
  user.additionalInfo = additionalInfo;
  user.email = email;
  user.mobile = mobile;
  user.hashedPassword = hashedPassword;
  user.version = version;
  user.role = role;

  return ok(user);
}
