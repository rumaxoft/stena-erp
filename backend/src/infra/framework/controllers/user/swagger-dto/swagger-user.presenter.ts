import { UserPresenter } from '@/shared/dtos/user';
import { ApiProperty } from '@nestjs/swagger';
import { SwaggerRolePresenter } from '../../role/swagger-dto/swagger-role.presenter';

export class SwaggerUserPresenter implements UserPresenter {
  @ApiProperty()
  readonly id: UniqueId;
  @ApiProperty()
  readonly createdAt: Date;
  @ApiProperty()
  readonly updatedAt: Date;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly middleName: string | null;
  @ApiProperty()
  readonly lastName: string | null;
  @ApiProperty()
  readonly additionalInfo: string | null;
  @ApiProperty()
  readonly email: Email | null;
  @ApiProperty()
  readonly emailVerified: boolean;
  @ApiProperty()
  readonly mobile: Phone | null;
  @ApiProperty()
  readonly mobileVerified: boolean;
  @ApiProperty()
  readonly role: SwaggerRolePresenter;
}
