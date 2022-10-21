import { UpdateRoleTitleDto } from '@/shared/dtos/role';
import { ApiProperty } from '@nestjs/swagger';

export class SwaggerUpdateRoleTitleDto implements UpdateRoleTitleDto {
  @ApiProperty()
  readonly id: UniqueId;
  @ApiProperty()
  readonly title: string;
}
