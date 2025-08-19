"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServer = void 0;
const config_1 = require("@shared/config");
const socket_service_1 = require("interfaceAdpaters/services/socket.service");
const socket_io_1 = require("socket.io");
const notification_events_1 = require("./events/notification.events");
class SocketServer {
    constructor(httpServer) {
        this._io = new socket_io_1.Server(httpServer, {
            cors: { origin: config_1.config.cors.ALLOWED_ORIGIN },
        });
        socket_service_1.SocketService.setIO(this._io);
        this.initializeConnection();
    }
    getIO() {
        return this._io;
    }
    initializeConnection() {
        this._io.on("connection", (socket) => {
            console.log("client connected", socket.id);
            const notificationEvents = new notification_events_1.NotificationEvents(socket, this._io);
            notificationEvents.register();
        });
    }
}
exports.SocketServer = SocketServer;
