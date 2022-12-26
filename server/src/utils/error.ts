export const HttpError = {
  Invalid: (message: string) =>
    JSON.stringify({
      status: 400,
      data: {
        message: message,
      },
    }),

  Forbidden: (message: string) =>
    JSON.stringify({
      status: 403,
      data: {
        message: message,
      },
    }),

  NotFound: (message: string) =>
    JSON.stringify({
      status: 404,
      data: {
        message: message,
      },
    }),

  Conflict: (message: string) =>
    JSON.stringify({
      status: 409,
      data: {
        message: message,
      },
    }),

  BadRequest: (message: string) =>
    JSON.stringify({
      status: 500,
      data: {
        message: message,
      },
    }),
};

export const HttpSuccess = {
  OK: (data: object) =>
    JSON.stringify({
      status: 200,
      data: data,
    }),

  Created: (data: object) =>
    JSON.stringify({
      status: 201,
      data: data,
    }),

  Accepted: (data: object) =>
    JSON.stringify({
      status: 202,
      data: data,
    }),
};
