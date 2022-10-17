import { Model } from '@/core/base/model.interface';
import { RoleModel } from '../role';

export abstract class UserModel implements Model {
  abstract id: UniqueId;
  abstract createdAt: Date;
  abstract updatedAt: Date;
  abstract name: string;
  abstract middleName: string | null;
  abstract lastName: string | null;
  abstract additionalInfo: string | null;
  abstract email: Email | null;
  protected abstract emailVerified: boolean;
  abstract mobile: Phone | null;
  protected abstract mobileVerified: boolean;
  abstract hashedPassword: HashedPassword | null;
  abstract salt: string | null;
  abstract version: number;
  abstract role: RoleModel;
}

export class UserModelImplement extends UserModel {
  id: UniqueId;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  middleName: string | null;
  lastName: string | null;
  additionalInfo: string | null;
  email: Email | null;
  protected emailVerified = false;
  mobile: Phone | null;
  protected mobileVerified = false;
  hashedPassword: HashedPassword | null;
  salt: string | null;
  version: number;
  role: RoleModel;

  isEqualPassword(hashedPassword: HashedPassword): boolean {
    return this.hashedPassword === hashedPassword;
  }

  getEmailVerified(): boolean {
    return this.emailVerified;
  }

  setEmailVerified(v: boolean): void {
    this.emailVerified = v;
  }

  getMobileVerified(): boolean {
    return this.mobileVerified;
  }

  setMobileVerified(v: boolean): void {
    this.mobileVerified = v;
  }
}
