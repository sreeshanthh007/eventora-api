import { IChatSocketHandler } from "@entities/socketHandlerInterfaces/chat-socket.handle.interface";
import { chatSocketHandler } from "@frameworks/di/resolver";
import { DIRECT_CHAT_EVENTS } from "@shared/constants";
import { Server } from "http";
import { Socket } from "socket.io";



export class DirectChatEvents{
    private _handler : IChatSocketHandler;
   
    constructor(private socket : Socket,private io : Server){
       this._handler = chatSocketHandler;
       this._handler.setSocket(this.socket,this.io);
    }

    register(){
        
        this.socket.on(
            DIRECT_CHAT_EVENTS.SEND_MESSAGE,
            this._handler.handleSendMessage
        );
        
    }
}