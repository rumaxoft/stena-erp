import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';

import {
  CreateRoleDto,
  RolePresenter,
  RolesPresenter,
  UpdateRoleTitleDto,
} from '@/shared/dtos/role';
import {
  CreateRoleUseCase,
  DeleteRoleByIdUseCase,
  FindAllRoleUseCase,
  FindRoleByIdUseCase,
  FindRoleByTitleUseCase,
  UpdateRoleTitleUseCase,
} from '@/use-cases/role';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorService } from '../../errors/error.service';
import { SwaggerCreateRoleDto } from './swagger-dto/swagger-create-role.dto';
import { SwaggerRolePresenter } from './swagger-dto/swagger-role.presenter';
import { SwaggerUpdateRoleTitleDto } from './swagger-dto/swagger-update-role-title.dto';

@Controller()
@ApiTags('role')
export class RoleController {
  constructor(
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly findRoleByIdUseCase: FindRoleByIdUseCase,
    private readonly findAllRoleUseCase: FindAllRoleUseCase,
    private readonly findRoleByTitleUseCase: FindRoleByTitleUseCase,
    private readonly updateRoleTitleUseCase: UpdateRoleTitleUseCase,
    private readonly deleteRoleByIdUseCase: DeleteRoleByIdUseCase,
    private readonly errorService: ErrorService,
  ) {}

  @Post('role')
  @ApiBadRequestResponse({
    description: 'bad request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal error',
  })
  @ApiBody({
    type: SwaggerCreateRoleDto,
  })
  @ApiCreatedResponse({
    type: SwaggerRolePresenter,
  })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<RolePresenter> {
    const result = await this.createRoleUseCase.execute(createRoleDto);
    if (result.isOk()) {
      return result.getResult();
    } else {
      const error = result.getResult();
      this.errorService.throwError(error);
    }
  }

  @Get('roles')
  @ApiInternalServerErrorResponse({
    description: 'Internal error',
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiOkResponse({ type: SwaggerRolePresenter, isArray: true })
  async findAll(): Promise<RolesPresenter> {
    const result = await this.findAllRoleUseCase.execute();
    if (result.isOk()) {
      return result.getResult();
    } else {
      const error = result.getResult();
      this.errorService.throwError(error);
    }
  }

  @Get('role/title/:title')
  @ApiInternalServerErrorResponse({
    description: 'Internal error',
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiOkResponse({
    type: SwaggerRolePresenter,
  })
  async findByTitle(@Param('title') title: string): Promise<RolePresenter> {
    const result = await this.findRoleByTitleUseCase.execute({
      title,
    });
    if (result.isOk()) {
      return result.getResult();
    } else {
      const error = result.getResult();
      this.errorService.throwError(error);
    }
  }

  @Get('role/:id')
  @ApiOkResponse({
    type: SwaggerRolePresenter,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal error',
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  async findById(@Param('id') id: string): Promise<RolePresenter> {
    const result = await this.findRoleByIdUseCase.execute({
      id,
    });
    if (result.isOk()) {
      return result.getResult();
    } else {
      const error = result.getResult();
      this.errorService.throwError(error);
    }
  }

  @Put()
  @ApiOkResponse({
    type: SwaggerRolePresenter,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal error',
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiBody({
    type: SwaggerUpdateRoleTitleDto,
  })
  async updateTitle(
    @Body() updateDto: UpdateRoleTitleDto,
  ): Promise<RolePresenter> {
    const result = await this.updateRoleTitleUseCase.execute(updateDto);
    if (result.isOk()) {
      return result.getResult();
    } else {
      const error = result.getResult();
      this.errorService.throwError(error);
    }
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'success',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal error',
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  async delete(@Param('id') id: string): Promise<string> {
    if (id) {
      const result = await this.deleteRoleByIdUseCase.execute({ id });
      if (result.isOk()) {
        return result.getResult();
      } else {
        const error = result.getResult();
        this.errorService.throwError(error);
      }
    }
  }
}
