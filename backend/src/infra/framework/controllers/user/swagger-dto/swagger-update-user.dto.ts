import { UpdateUserDto } from '@/shared/dtos/user';
import { ApiProperty } from '@nestjs/swagger';

export class SwaggerUpdateUserDto implements UpdateUserDto {
  @ApiProperty()
  readonly id: UniqueId;
  @ApiProperty({
    required: false,
  })
  readonly name?: string;
  @ApiProperty({
    required: false,
  })
  readonly middleName?: string;
  @ApiProperty({
    required: false,
  })
  readonly lastName?: string;
  @ApiProperty({
    required: false,
  })
  readonly password?: string;
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
  readonly roleId?: UniqueId;
}
