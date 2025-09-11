import { ILogger } from "./logger.interface";
import { logger } from "@frameworks/logger/winston-logger";
import { injectable } from "tsyringe";

@injectable()
export class WinstonLoggerAdapter implements ILogger {
    info(message: string, meta?: Record<string, unknown>): void {
        logger.info(message,meta)
    }

    warn(message: string, meta?: Record<string, unknown>): void {
        logger.warn(message,meta)
    }

    debug(message: string, meta?: Record<string, unknown>): void {
        logger.debug(message,meta)
    }

    error(message: string, meta?: Record<string, unknown>): void {
        logger.error(message,meta)
    }
}