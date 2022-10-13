import {
  ErrorType,
  IFormatErrorMessage,
} from '@/core/ports/errors/errors.interface';
export type ErrorMessage = {
  [key: string]: IFormatErrorMessage;
};

export const errorMessage: ErrorMessage = {
  ROLE_WITH_PROVIDED_TITLE_ALREADY_EXISTS: {
    message: 'role with provided value already exists',
    errorType: ErrorType.BAD_REQUEST_ERROR,
  },
  ROLE_NOT_FOUND: {
    message: 'role with provided parameters not found',
    errorType: ErrorType.BAD_REQUEST_ERROR,
  },
  NO_TITLE_PROVIDED: {
    message: 'no title provided',
    errorType: ErrorType.BAD_REQUEST_ERROR,
  },
};
