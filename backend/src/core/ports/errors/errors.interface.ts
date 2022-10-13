export enum ErrorType {
  BAD_REQUEST_ERROR = 'bad request error',
  INTERNAL_SERVER_ERROR = 'internal server error',
  FORBIDDEN_ERROR = 'forbidden error',
  UNAUTORIZED_ERROR = 'unauthorized error',
  NOT_FOUND_ERROR = 'not found',
}

export interface IFormatErrorMessage {
  message: string;
  code_error?: number;
  errorType: ErrorType;
}

export interface IError {
  throwError(data: IFormatErrorMessage): void;
  badRequestError(data: IFormatErrorMessage): void;
  internalServerError(data?: IFormatErrorMessage): void;
  forbiddenError(data?: IFormatErrorMessage): void;
  unauthorizedError(data?: IFormatErrorMessage): void;
  notFoundError(data?: IFormatErrorMessage): void;
}
