"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const constants_1 = require("@shared/constants");
const custom_error_1 = require("./custom.error");
class ValidationError extends custom_error_1.CustomError {
    constructor(message, errors) {
        super(message, constants_1.HTTP_STATUS.BAD_REQUEST);
        this.errors = errors;
        this.name = "validationError";
    }
}
exports.ValidationError = ValidationError;
