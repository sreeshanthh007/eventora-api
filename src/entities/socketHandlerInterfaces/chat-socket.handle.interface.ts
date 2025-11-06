import { ReadMessageDTO, SendMessageDTO } from "@shared/dtos/message.dto";
import { Socket, Server } from "socket.io";

export interface IChatSocketHandler{
    setSocket(socket:Socket,io:Server) :Promise<void>
    handleSendMessage(data:SendMessageDTO) : Promise<void>
    handleReadMessage(data:ReadMessageDTO) : Promise<void>
}