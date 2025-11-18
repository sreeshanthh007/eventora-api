import { config } from "@shared/config";
import { Server as Httpserver } from "http";
import { SocketService } from "interfaceAdapters/services/socket/socket.service";
import { Server, Socket } from "socket.io";
import { NotificationEvents } from "./events/notification.events";
import { ChatEvents } from "./events/chat-events";
import { SocketUserStore } from "./socket.user.store";

export class SocketServer {
  private _io: Server;
  private _socketStore = SocketUserStore.getInstance()

  constructor(httpServer: Httpserver) {
    this._io = new Server(httpServer, {
      cors: { origin: config.cors.ALLOWED_ORIGIN },
    });

    SocketService.setIO(this._io);
    this.initializeConnection();
  }

  public getIO() {
    return this._io;
  }

  private initializeConnection() {
    this._io.on("connection", (socket: Socket) => {
      console.log("socket connected");
  
   

      const notificationEvents = new NotificationEvents(socket, this._io);
      notificationEvents.register();

      const chatEvents = new ChatEvents(socket,this._io)
      chatEvents.register()

    });
  } 
}
