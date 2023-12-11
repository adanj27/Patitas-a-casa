export interface MyError {
  status: boolean;
  message: string;
  data?: null;
}

export const Errors = {
  NOT_FOUND: {
    status: false,
    message: "This record was not found.",
  },
  DATA_ERROR: {
    status: false,
    message: "invalid credentials.",
  },
  ALREADY_EXIST: {
    status: false,
    message: "This record already exists.",
  },
  UNAUTHENTIFATED: {
    status: false,
    message: "You are not authenticated.",
  },
  UNAUTHORIZED: { status: false, message: "You are not authorized." },
  MSG: (message: string) => ({
    status: false,
    message,
  }),
  ERROR: (error: string) => ({
    status: false,
    message: `Something unexpected has happened ${error}`,
  }),
};
