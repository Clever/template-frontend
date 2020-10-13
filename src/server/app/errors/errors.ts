/**
 * Constructors of errors must explicitly set prototype as per
 * https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md
 *   #extending-built-ins-like-error-array-and-map-may-no-longer-work
 * Otherwise, they won't subclass properly.
 */

// 401 Unauthorized
export class AuthenticationError extends Error {
  message: string;
  code: number;

  constructor(message = "Unauthorized", code = 0) {
    super(message);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
    this.message = message;
    this.code = code;
  }
}

// 403 Forbidden
export class PermissionError extends Error {
  message: string;
  code: number;

  constructor(message = "Forbidden", code = 0) {
    super(message);
    Object.setPrototypeOf(this, PermissionError.prototype);
    this.message = message;
    this.code = code;
  }
}

// 404 Not Found
export class NotFoundError extends Error {
  message: string;
  code: number;

  constructor(message = "Not Found", code = 0) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
    this.message = message;
    this.code = code;
  }
}

// 422 Unprocessable Entity
export class ValidationError extends Error {
  message: string;
  code: number;

  constructor(message = "Unprocessable Entity", code = 0) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
    this.message = message;
    this.code = code;
  }
}

// 500 Internal Server Error
export class InternalError extends Error {
  message: string;
  code: number;

  constructor(message = "Internal Server Error", code = 0) {
    super(message);
    Object.setPrototypeOf(this, InternalError.prototype);
    this.message = message;
    this.code = code;
    Error.captureStackTrace(this);
  }
}
