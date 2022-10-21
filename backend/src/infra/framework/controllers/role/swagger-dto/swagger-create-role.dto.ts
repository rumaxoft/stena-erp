import { CreateRoleDto } from '@/shared/dtos/role';
import { ApiProperty } from '@nestjs/swagger';

export class SwaggerCreateRoleDto implements CreateRoleDto {
  @ApiProperty({
    required: true,
  })
  readonly title!: string;
  @ApiProperty({
    required: false,
  })
  readonly isActive?: boolean;
  @ApiProperty({
    required: false,
  })
  readonly description?: string;
}
