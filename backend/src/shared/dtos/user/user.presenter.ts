import { UserModel } from '@/core/domain/models/user/user.model';
import { RolePresenter } from '../role';
export class UserPresenter {
  readonly id: UniqueId;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly name: string;
  readonly middleName: string | null;
  readonly lastName: string | null;
  readonly additionalInfo: string | null;
  readonly email: Email | null;
  readonly emailVerified: boolean;
  readonly mobile: Phone | null;
  readonly mobileVerified: boolean;
  readonly role: RolePresenter;

  constructor(user: UserModel) {
    this.id = user.id;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.name = user.name;
    this.middleName = user.middleName;
    this.lastName = user.lastName;
    this.additionalInfo = user.additionalInfo;
    this.email = user.email;
    this.emailVerified = user.emailVerified;
    this.mobile = user.mobile;
    this.mobileVerified = user.mobileVerified;
    this.role = new RolePresenter(user.role);
  }
}
