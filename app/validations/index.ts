import { Request, Response } from "express";
import { ObjectSchema, ValidationError } from "yup";

interface ValidationObjectInterface {
  [key: string]: any;
}

export * from "./auth.validation";
export const validate = async (
  validator: ObjectSchema<ValidationObjectInterface>,
  req: Request,
  res: Response
): Promise<boolean> => {
  let isValid = true;
  await validator
    .validate(req.body, { abortEarly: false })
    .catch((e: ValidationError) => {
      let errors = {};
      e.inner.forEach((error: ValidationError) => {
        if (error.path) errors[error.path] = error.errors[0] || "";
      });
      res
        .status(400)
        .json({ status: false, message: "Validation failed!", errors });
      isValid = false;
    });
  return isValid;
};
