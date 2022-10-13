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
  ROLE_TITLE_IS_NOT_VALID: {
    message: 'Role title should be more than 5 characters',
    errorType: ErrorType.BAD_REQUEST_ERROR,
  },
};
