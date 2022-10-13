import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
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
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorService } from '../../errors/error.service';

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
  @ApiResponse({
    status: 201,
    description: 'created',
  })
  @ApiBadRequestResponse({
    description: 'bad request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal error',
  })
  @ApiNotFoundResponse({ description: 'not found' })
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
  @ApiResponse({
    status: 200,
    description: 'response was succesful',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal error',
  })
  async findAll(): Promise<RolesPresenter> {
    const result = await this.findAllRoleUseCase.execute();
    if (result.isOk()) {
      return result.getResult();
    } else {
      const error = result.getResult();
      this.errorService.throwError(error);
    }
  }

  @Get('role')
  @ApiResponse({
    status: 200,
    description: 'response was succesful',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal error',
  })
  async findByTitle(@Query('title') title: string): Promise<RolePresenter> {
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
  @ApiResponse({
    status: 200,
    description: 'response was succesful',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal error',
  })
  async findById(@Param('id') id: string): Promise<RolePresenter> {
    console.log('id ', id);
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
  @ApiResponse({
    status: 200,
    description: 'response was succesful',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal error',
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
    status: 200,
    description: 'response was succesful',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal error',
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
