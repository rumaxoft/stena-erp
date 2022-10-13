import { RoleModel, RoleModelImplement } from './role.model';
import { Result, ok, err } from '@/shared/helpers/result-monad';
import { isUUID } from '@/shared/helpers/validation';
import { errorMessage } from './error';
import { IFormatErrorMessage } from '@/core/ports/errors/errors.interface';

export type roleFactoryArgs = {
  id: UniqueId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  isActive?: boolean;
  description?: string;
  version?: number;
};
export function roleFactory({
  id,
  title,
  createdAt,
  updatedAt,
  isActive = true,
  description = 'no description',
  version = 1,
}: roleFactoryArgs): Result<RoleModel, IFormatErrorMessage> {
  const role = new RoleModelImplement();

  if (!isUUID(id, 4)) {
    return err(errorMessage.ID_IS_NOT_VALID);
  }

  if (title.length < 5) {
    return err(errorMessage.ROLE_TITLE_IS_NOT_VALID);
  }

  role.id = id;
  role.title = title;
  role.createdAt = createdAt;
  role.updatedAt = updatedAt;
  role.isActive = isActive;
  role.description = description;
  role.version = version;

  return ok(role);
}
