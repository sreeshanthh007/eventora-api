"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketService = void 0;
const custom_error_1 = require("@entities/utils/custom.error");
const constants_1 = require("@shared/constants");
class SocketService {
    static setIO(io) {
        this._io = io;
    }
    static getIO() {
        if (!this._io) {
            throw new custom_error_1.CustomError("socket.io is not yet set", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
        return this._io;
    }
}
exports.SocketService = SocketService;
