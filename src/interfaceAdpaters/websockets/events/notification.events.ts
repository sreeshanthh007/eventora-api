import socketLogger from "@shared/utils/socket.logger";
import { Server, Socket } from "socket.io";
import { SocketUserStore } from "../socket.user.store";


export class NotificationEvents {
    private _socketStore = SocketUserStore.getInstance()
    constructor(
        private _socket :Socket,
        private _io : Server
    ){}

    register(){
        this._socket.on("joinVendorRoom",(vendorId:string)=>{
        this._socket.join(`vendor_${vendorId}`)
        this._socketStore.addUser(vendorId, this._socket.id)
        console.log(`Vendor_${vendorId} joined their room`);
        socketLogger.info(`vendor ${vendorId} joined their room`)
      });
    }
}