// import { Request, Response, NextFunction } from "express";

export interface MyError {
  status: boolean;
  message: string;
  data?: null;
}

export const Errors = {
  NOT_FOUND: {
    status: false,
    message: "blog not found.",
  },

  ALREADY_EXIST: {
    status: false,
    message: "This title already exists :)",
  },

  VALUES_ERROR: (error: string) => ({
    status: false,
    message: `Error inputs ${error}`,
  }),

  ERROR_DATABASE: (error: string) => ({
    status: false,
    message: `Something unexpected has happened with the database ${error}`,
  }),
};

// export const errorHandler = (
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// };
