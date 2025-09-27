import { inject, injectable } from "tsyringe";
import { ILogger } from "interfaceAdpaters/services/logger/logger.interface";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS, ERROR_MESSAGES } from "@shared/constants";
import { ZodError } from "zod";
import { CustomError } from "@entities/utils/custom.error";
import { ValidationError } from "@entities/utils/validation.error";
import { TError } from "@shared/types/error.type";
import { TValidationIssue } from "@shared/types/error.type";

@injectable()
export class ErrorMiddleware {
  constructor(@inject("ILogger") private logger: ILogger) {}

  public handleError(
    err: TError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    let statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    let message: string = ERROR_MESSAGES.SERVER_ERROR;
    let errors: TValidationIssue[] | undefined

    this.logger.error("An Error Occurred", {
      message: err.message,
      stack: err.stack,
      method: req.method,
      url: req.url,
      ip: req.ip,
      timestamp: new Date().toISOString(),
    });

 
    if (err instanceof ZodError) {
      statusCode = HTTP_STATUS.BAD_REQUEST;
      message = ERROR_MESSAGES.VALIDATION_ERROR;
      errors = err.errors.map((e) => ({ message: e.message }));
    }

   
    else if (err instanceof CustomError) {
      statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      message = err.message;

      if (err instanceof ValidationError) {
        errors = err.errors;
      }
    }

 
    else {
      statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      message = err.message || ERROR_MESSAGES.SERVER_ERROR;
    }

  
      if (res.headersSent) {
        return next(err);
      }

  
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      ...(errors && { errors }),
      ...(process.env.NODE_DEV === "development" && { stack: err.stack }),
    });
  }
}
