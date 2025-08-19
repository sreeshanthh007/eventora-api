import { Server, Socket } from "socket.io";


export class NotificationEvents {
    constructor(
        private _socket :Socket,
        private _io : Server
    ){}

    register(){
        this._socket.on("joinVendorRoom",(vendorId:string)=>{
        this._socket.join(`Vendor ${vendorId}`)
        console.log(`Vendor ${vendorId} joined their room`);
      });
    }
}