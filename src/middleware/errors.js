function NotAuthenticatedError(message) {
  this.message = message;
  const lastPart = new Error().stack.match(/[^\s]+$/);
  this.stack = `${this.name} at ${lastPart}`;
}
Object.setPrototypeOf(NotAuthenticatedError, Error);
NotAuthenticatedError.prototype = Object.create(Error.prototype);
NotAuthenticatedError.prototype.name = 'NotAuthenticatedError';
NotAuthenticatedError.prototype.message = '';
NotAuthenticatedError.prototype.constructor = NotAuthenticatedError;

function HttpError(message, status, json) {
  this.message = message;
  const lastPart = new Error().stack.match(/[^\s]+$/);
  this.stack = `${this.name} at ${lastPart}`;
  this.status = status;
  this.json = json;
}
Object.setPrototypeOf(HttpError, Error);
HttpError.prototype = Object.create(Error.prototype);
HttpError.prototype.name = 'HttpError';
HttpError.prototype.message = '';
HttpError.prototype.constructor = HttpError;

function ValidationError(message, json) {
  this.message = message;
  const lastPart = new Error().stack.match(/[^\s]+$/);
  this.stack = `${this.name} at ${lastPart}`;
  this.json = json;
}
Object.setPrototypeOf(ValidationError, Error);
ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.name = 'ValidationError';
ValidationError.prototype.message = '';
ValidationError.prototype.constructor = ValidationError;


export {
  NotAuthenticatedError,
  HttpError,
  ValidationError,
};
