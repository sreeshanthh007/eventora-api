import { IChatSocketHandler } from "@entities/socketHandlerInterfaces/chat-socket.handle.interface";
import { chatSocketHandler } from "@frameworks/di/resolver";
import { DIRECT_CHAT_EVENTS } from "@shared/constants";
import { SendMessageDTO } from "@shared/dtos/message.dto";
import { Server, Socket } from "socket.io";

export class ChatEvents {
  private _handler: IChatSocketHandler;

  constructor(private socket: Socket, private io: Server) {
    this._handler = chatSocketHandler;
    this._handler.setSocket(this.socket, this.io);
  }

  register() {
    this.socket.on(DIRECT_CHAT_EVENTS.SEND_MESSAGE, (message: SendMessageDTO) =>
      this._handler.handleSendMessage(message)
    );

    this.socket.on(
      DIRECT_CHAT_EVENTS.READ_MESSAGE,
      this._handler.handleReadMessage
    );

    this.socket.on(DIRECT_CHAT_EVENTS.JOIN_ROOM, (roomId: string) =>
      this._handler.handleJoinRoom(roomId)
    );
  }
}
