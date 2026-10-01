export class HttpError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

export class BadRequest extends HttpError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

export class Unauthorized extends HttpError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

export class Conflict extends HttpError {
  constructor(message = 'Conflict') {
    super(message, 409);
  }
}
