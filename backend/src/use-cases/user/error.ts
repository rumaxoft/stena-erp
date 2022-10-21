import {
  ErrorType,
  IFormatErrorMessage,
} from '@/core/ports/errors/errors.interface';
export type ErrorMessage = {
  [key: string]: IFormatErrorMessage;
};

export const errorMessage: ErrorMessage = {
  USER_WITH_PROVIDED_EMAIL_ALREADY_EXISTS: {
    message: 'user with provided email already exists',
    errorType: ErrorType.BAD_REQUEST_ERROR,
  },
  USER_WITH_PROVIDED_MOBILE_ALREADY_EXISTS: {
    message: 'user with provided mobile phone already exists',
    errorType: ErrorType.BAD_REQUEST_ERROR,
  },
  USER_NOT_FOUND: {
    message: 'user with provided parameters not found',
    errorType: ErrorType.BAD_REQUEST_ERROR,
  },
  USER_ROLE_NOT_FOUND: {
    message: 'user role with provided id not found',
    errorType: ErrorType.BAD_REQUEST_ERROR,
  },
  NO_NAME_PROVIDED: {
    message: 'no name provided',
    errorType: ErrorType.BAD_REQUEST_ERROR,
  },
  NO_ROLE_ID_PROVIDED: {
    message: 'no roleId provided',
    errorType: ErrorType.BAD_REQUEST_ERROR,
  },
  PROVIDED_ROLE_ID_IS_NOT_FOUND: {
    message: 'provided role id not found',
    errorType: ErrorType.BAD_REQUEST_ERROR,
  },
  NO_USER_ID_PROVIDED: {
    message: 'no userId provided',
    errorType: ErrorType.BAD_REQUEST_ERROR,
  },
  CANT_SET_PASSWORD_IF_NO_EMAIL_OR_MOBILE: {
    message: 'password can not be set if there is no email or mobile',
    errorType: ErrorType.BAD_REQUEST_ERROR,
  },
  PASSWORD_IS_NOT_VALID: {
    message: 'password is not valid, it must be at least 8 chatacters',
    errorType: ErrorType.BAD_REQUEST_ERROR,
  },
  CREATING_USER_WITH_PROVIDED_ROLE_IS_FORBIDDEN: {
    message:
      'creating user with provided role is forbidden, for more information please contact your admin',
    errorType: ErrorType.FORBIDDEN_ERROR,
  },
  SETTING_PROVIDED_ROLE_TO_USER_IS_FORBIDDEN: {
    message:
      'setting provided role to user is forbidden, for more information please contact your admin',
    errorType: ErrorType.FORBIDDEN_ERROR,
  },
};
