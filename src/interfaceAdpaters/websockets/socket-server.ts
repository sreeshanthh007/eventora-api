import { config } from "@shared/config";
import { Server as Httpserver } from "http";
import { SocketService } from "interfaceAdpaters/services/socket.service";
import { Server, Socket } from "socket.io";
import { NotificationEvents } from "./events/notification.events";

export class SocketServer {
  private _io: Server;

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
      console.log("client connected", socket.id);

      const notificationEvents = new NotificationEvents(socket, this._io);
      notificationEvents.register();
    });
  } 
}
