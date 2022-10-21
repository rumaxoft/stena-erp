import { CreateUserDto } from '@/shared/dtos/user';
import { ApiProperty } from '@nestjs/swagger';

export class SwaggerCreateUserDto implements CreateUserDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty({
    required: false,
  })
  readonly middlename?: string;
  @ApiProperty({
    required: false,
  })
  readonly lastName?: string;
  @ApiProperty({
    required: false,
  })
  readonly additionalInfo?: string;
  @ApiProperty({
    required: false,
  })
  readonly email?: string;
  @ApiProperty({
    required: false,
  })
  readonly mobile?: string;
  @ApiProperty({
    required: false,
  })
  readonly password?: string;
  @ApiProperty()
  readonly roleId: UniqueId;
}
