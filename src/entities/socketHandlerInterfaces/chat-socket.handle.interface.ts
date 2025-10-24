import { SendMessageDTO } from "@shared/dtos/message.dto";
import { Server } from "http";
import { Socket } from "socket.io";

export interface IChatSocketHandler{
    setSocket(socket:Socket,io:Server) :Promise<void>
    handleSendMessage(data:SendMessageDTO) : void
    
}