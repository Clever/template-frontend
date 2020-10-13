import { ErrorCode } from "src/shared/constants";

/**
 * Constructors of errors must explicitly set prototype as per
 * https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md
 *   #extending-built-ins-like-error-array-and-map-may-no-longer-work
 * Otherwise, they won't subclass properly.
 */

// 401 Unauthorized
export class AuthenticationError extends Error {
  message: string;
  code: ErrorCode;

  constructor(message = "Unauthorized", code: ErrorCode = "Unknown") {
    super(message);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
    this.message = message;
    this.code = code;
  }
}

// 403 Forbidden
export class PermissionError extends Error {
  message: string;
  code: ErrorCode;

  constructor(message = "Forbidden", code: ErrorCode  = "Unknown") {
    super(message);
    Object.setPrototypeOf(this, PermissionError.prototype);
    this.message = message;
    this.code = code;
  }
}

// 404 Not Found
export class NotFoundError extends Error {
  message: string;
  code: ErrorCode;

  constructor(message = "Not Found", code: ErrorCode  = "Unknown") {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
    this.message = message;
    this.code = code;
  }
}

// 422 Unprocessable Entity
export class ValidationError extends Error {
  message: string;
  code: ErrorCode;

  constructor(message = "Unprocessable Entity", code: ErrorCode  = "Unknown") {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
    this.message = message;
    this.code = code;
  }
}
