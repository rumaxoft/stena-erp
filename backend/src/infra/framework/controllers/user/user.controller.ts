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
  CreateUserDto,
  UpdateUserDto,
  UserPresenter,
  UsersPresenter,
} from '@/shared/dtos/user';

import {
  CreateUserUseCase,
  UpdateUserUseCase,
  FindAllUserUseCase,
  FindManyUserUseCase,
  FindUserByEmailUseCase,
  FindUserByIdUseCase,
  FindUserByMobileUseCase,
  FindUserByNameUseCase,
  DeleteUserByIdUseCase,
} from '@/use-cases/user';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorService } from '../../errors/error.service';

@Controller()
@ApiTags('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserByIdUseCase: DeleteUserByIdUseCase,
    private readonly findAllUserUseCase: FindAllUserUseCase,
    private readonly findManyUserUseCase: FindManyUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findUserByNameUseCase: FindUserByNameUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly findUserByMobileUseCase: FindUserByMobileUseCase,
    private readonly errorService: ErrorService,
  ) {}

  @Post('user')
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
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiOkResponse({
    type: UserPresenter,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserPresenter> {
    const result = await this.createUserUseCase.execute(createUserDto);
    if (result.isOk()) {
      return result.getResult();
    } else {
      const error = result.getResult();
      this.errorService.throwError(error);
    }
  }

  @Get('users')
  @ApiResponse({
    status: 200,
    description: 'response was succesful',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal error',
  })
  @ApiOkResponse({
    type: UserPresenter,
    isArray: true,
  })
  async findAll(): Promise<UsersPresenter> {
    const result = await this.findAllUserUseCase.execute();
    if (result.isOk()) {
      return result.getResult();
    } else {
      const error = result.getResult();
      this.errorService.throwError(error);
    }
  }

  @Get('users/many')
  @ApiResponse({
    status: 200,
    description: 'response was succesful',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal error',
  })
  @ApiOkResponse({
    type: UserPresenter,
    isArray: true,
  })
  async findMany(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<UsersPresenter> {
    const result = await this.findManyUserUseCase.execute({ offset, limit });
    if (result.isOk()) {
      return result.getResult();
    } else {
      const error = result.getResult();
      this.errorService.throwError(error);
    }
  }

  @Get('user/name/:name')
  @ApiResponse({
    status: 200,
    description: 'response was succesful',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal error',
  })
  @ApiOkResponse({
    type: UserPresenter,
  })
  async findByName(@Param('name') name: string): Promise<UsersPresenter> {
    const result = await this.findUserByNameUseCase.execute({
      name,
    });
    if (result.isOk()) {
      return result.getResult();
    } else {
      const error = result.getResult();
      this.errorService.throwError(error);
    }
  }

  @Get('user/mobile/:mobile')
  @ApiResponse({
    status: 200,
    description: 'response was succesful',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal error',
  })
  @ApiOkResponse({
    type: UserPresenter,
  })
  async findByMobile(@Param('mobile') mobile: string): Promise<UserPresenter> {
    const result = await this.findUserByMobileUseCase.execute({
      mobile,
    });
    if (result.isOk()) {
      return result.getResult();
    } else {
      const error = result.getResult();
      this.errorService.throwError(error);
    }
  }

  @Get('user/email/:email')
  @ApiResponse({
    status: 200,
    description: 'response was succesful',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal error',
  })
  @ApiOkResponse({
    type: UserPresenter,
  })
  async findByEmail(@Param('email') email: string): Promise<UserPresenter> {
    const result = await this.findUserByEmailUseCase.execute({
      email,
    });
    if (result.isOk()) {
      return result.getResult();
    } else {
      const error = result.getResult();
      this.errorService.throwError(error);
    }
  }

  @Get('user/:id')
  @ApiResponse({
    status: 200,
    type: UserPresenter,
    description: 'response was succesful',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal error',
  })
  async findById(@Param('id') id: string): Promise<UserPresenter | null> {
    const result = await this.findUserByIdUseCase.execute({
      id,
    });
    if (result.isOk()) {
      return result.getResult();
    } else {
      const error = result.getResult();
      this.errorService.throwError(error);
    }
  }

  @Put('user')
  @ApiResponse({
    status: 200,
    description: 'response was succesful',
    type: UserPresenter,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal error',
  })
  async updateUser(@Body() updateDto: UpdateUserDto): Promise<UserPresenter> {
    const result = await this.updateUserUseCase.execute(updateDto);
    if (result.isOk()) {
      return result.getResult();
    } else {
      const error = result.getResult();
      this.errorService.throwError(error);
    }
  }

  @Delete('user/:id')
  @ApiResponse({
    status: 200,
    description: 'response was succesful',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal error',
  })
  async delete(@Param('id') id: string): Promise<string> {
    if (id) {
      const result = await this.deleteUserByIdUseCase.execute({ id });
      if (result.isOk()) {
        return result.getResult();
      } else {
        const error = result.getResult();
        this.errorService.throwError(error);
      }
    }
  }
}
