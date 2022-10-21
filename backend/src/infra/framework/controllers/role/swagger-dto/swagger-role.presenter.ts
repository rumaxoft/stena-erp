import { ApiProperty } from '@nestjs/swagger';
import { RolePresenter } from '@/shared/dtos/role';

export class SwaggerRolePresenter implements RolePresenter {
  @ApiProperty()
  id: UniqueId;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  title: string;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  description: string;
}
