import { IChatSocketHandler } from "@entities/socketHandlerInterfaces/chat-socket.handle.interface";
import { ReadMessageDTO, SendMessageDTO } from "@shared/dtos/message.dto";
import socketLogger from "@shared/utils/socket.logger";
import { Server, Socket } from "socket.io";
import { SocketUserStore } from "../socket.user.store";
import { DIRECT_CHAT_EVENTS } from "@shared/constants";
import { inject, injectable } from "tsyringe";
import { ISendMessageUseCase } from "@entities/useCaseInterfaces/chat/send-message.usecase.interface";
import { IReadMessageUseCase } from "@entities/useCaseInterfaces/chat/read-message.usecase.interface";

@injectable()
export class ChatSocketHandler implements IChatSocketHandler{
private _socket!: Socket;
  private _io!: Server;
    private _socketUserStore = SocketUserStore.getInstance();
    constructor(
        @inject("ISendMessageUseCase") private _sendMessageUseCase : ISendMessageUseCase,
        @inject("IReadMessageUseCase") private _readMessageUseCase : IReadMessageUseCase
    ){}

    async setSocket(socket: Socket, io: Server): Promise<void> {
        this._socket = socket
        this._io = io
    }

   async handleSendMessage(data: SendMessageDTO): Promise<void> {
          try {
            socketLogger.info("Message Sent",{
                socketId:this._socket.id,
                userId:this._socket.data.userId
            });
           
            const receiverSocketId = this._socketUserStore.getSocketId(data.receiverId)
            const result = await this._sendMessageUseCase.execute(data)

          if(receiverSocketId){
            this._io
            .to(receiverSocketId)
            .emit(DIRECT_CHAT_EVENTS.RECEIVE_MESSAGE,result);
          }
            
        } catch (error) {
            socketLogger.error(error)
        }
   }


   async handleReadMessage(data: ReadMessageDTO): Promise<void> {
       
    try {
        const userId = this._socket.data.userId
      
        socketLogger.info("Message Read",{
            socketId:this._socket.id,
            userId
        });

        const chatRoomId = data.chatRoomId

        await this._readMessageUseCase.execute({
            chatRoomId,
            userId
        });

        this._socket.emit(DIRECT_CHAT_EVENTS.READ_MESSAGE,chatRoomId)
        
    } catch (error) {
        socketLogger.error(error)
    }
   }

   async handleJoinRoom(roomId: string): Promise<void> {
    socketLogger.info("direct-chat:room-joined",{
        socketId:this._socket.id,
        roomId
    });

    this._socket.emit("online-users",this._socketUserStore.getAllUsers())
       this._socket.join(roomId)
   }
}