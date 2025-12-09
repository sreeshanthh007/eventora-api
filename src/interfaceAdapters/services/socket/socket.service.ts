
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { Server } from "socket.io";




export class SocketService{

    private static _io : Server;
    public static setIO(io: Server): void {
        this._io = io
    }

    public static getIO(): Server {
        if(!this._io){
            throw new CustomError(ERROR_MESSAGES.SOCKET_NOT_FOUND,HTTP_STATUS.INTERNAL_SERVER_ERROR)
        }

        return this._io
    }
}