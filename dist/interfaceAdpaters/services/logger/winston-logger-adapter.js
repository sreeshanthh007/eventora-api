"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinstonLoggerAdapter = void 0;
const winston_logger_1 = require("@frameworks/logger/winston-logger");
const tsyringe_1 = require("tsyringe");
let WinstonLoggerAdapter = class WinstonLoggerAdapter {
    info(message, meta) {
        winston_logger_1.logger.info(message, meta);
    }
    warn(message, meta) {
        winston_logger_1.logger.warn(message, meta);
    }
    debug(message, meta) {
        winston_logger_1.logger.debug(message, meta);
    }
    error(message, meta) {
        winston_logger_1.logger.error(message, meta);
    }
};
exports.WinstonLoggerAdapter = WinstonLoggerAdapter;
exports.WinstonLoggerAdapter = WinstonLoggerAdapter = __decorate([
    (0, tsyringe_1.injectable)()
], WinstonLoggerAdapter);
