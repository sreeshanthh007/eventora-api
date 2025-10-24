import { IChatSocketHandler } from "@entities/socketHandlerInterfaces/chat-socket.handle.interface";
import { SendMessageDTO } from "@shared/dtos/message.dto";
import socketLogger from "@shared/utils/socket.logger";
import { Server } from "http";
import { Socket } from "socket.io";
import { SocketUserStore } from "../socket.user.store";


export class ChatSocketHandler implements IChatSocketHandler{
private _socket!: Socket;
  private _io!: Server;
    private _socketUserStore = SocketUserStore.getInstance();
    constructor(

    ){}

    async setSocket(socket: Socket, io: Server): Promise<void> {
        this._socket = socket
        this._io = io
    }

    handleSendMessage(data: SendMessageDTO): void {
        
        try {
            socketLogger.info("Message Sent",{
                socketId:this._socket.id,
                userId:this._socket.data.userId
            });

            const receiverSocketId = this._socketUserStore.getSocketId(data.receiverId)

            console.log(receiverSocketId);
            
        } catch (error) {
            socketLogger.error(error)
        }
    }
}