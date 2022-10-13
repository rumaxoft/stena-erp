import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import {
  ErrorType,
  IError,
  IFormatErrorMessage,
} from '@/core/ports/errors/errors.interface';

@Injectable()
export class ErrorService implements IError {
  throwError(data: IFormatErrorMessage): void {
    switch (data.errorType) {
      case ErrorType.BAD_REQUEST_ERROR:
        this.badRequestError(data);
        break;
      case ErrorType.FORBIDDEN_ERROR:
        this.forbiddenError(data);
        break;
      case ErrorType.INTERNAL_SERVER_ERROR:
        this.internalServerError(data);
        break;
      case ErrorType.UNAUTORIZED_ERROR:
        this.unauthorizedError(data);
        break;
      case ErrorType.NOT_FOUND_ERROR:
        this.notFoundError(data);
        break;
      default:
        this.internalServerError(data);
    }
  }
  badRequestError(data: IFormatErrorMessage): void {
    throw new BadRequestException(data);
  }
  internalServerError(data?: IFormatErrorMessage): void {
    throw new InternalServerErrorException(data);
  }
  forbiddenError(data?: IFormatErrorMessage): void {
    throw new ForbiddenException(data);
  }
  unauthorizedError(data?: IFormatErrorMessage): void {
    throw new UnauthorizedException(data);
  }
  notFoundError(data?: IFormatErrorMessage): void {
    throw new NotFoundException(data);
  }
}
