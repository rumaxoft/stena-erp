export class CreateUserDto {
  readonly name!: string;
  readonly middlename?: string;
  readonly lastName?: string;
  readonly additionalInfo?: string;
  readonly email?: string;
  readonly mobile?: Phone;
  readonly password?: string;
  readonly roleId!: UniqueId;
}
