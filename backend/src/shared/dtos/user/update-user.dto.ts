export class UpdateUserDto {
  readonly id: UniqueId;
  readonly name?: string;
  readonly middleName?: string;
  readonly lastName?: string;
  readonly password?: string;
  readonly email?: string;
  readonly mobile?: string;
  readonly roleId?: UniqueId;
}
