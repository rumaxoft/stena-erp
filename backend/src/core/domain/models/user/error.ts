import {
  ErrorType,
  IFormatErrorMessage,
} from '@/core/ports/errors/errors.interface';
export type ErrorMessage = {
  [key: string]: IFormatErrorMessage;
};

export const errorMessage: ErrorMessage = {
  ID_IS_NOT_VALID: {
    message: 'Id is not valid',
    errorType: ErrorType.BAD_REQUEST_ERROR,
  },
  EMAIL_IS_NOT_VALID: {
    message: 'Email is not valid',
    errorType: ErrorType.BAD_REQUEST_ERROR,
  },
  EMAIL_CANT_BE_EMPTY_STRING: {
    message: 'Email cant be empty string',
    errorType: ErrorType.BAD_REQUEST_ERROR,
  },
  MOBILE_CANT_BE_EMPTY_STRING: {
    message: 'Mobile cant be empty string',
    errorType: ErrorType.BAD_REQUEST_ERROR,
  },
  PASSWORD_IS_NOT_HASH: {
    message: 'Password is not hash',
    errorType: ErrorType.INTERNAL_SERVER_ERROR,
  },
};
