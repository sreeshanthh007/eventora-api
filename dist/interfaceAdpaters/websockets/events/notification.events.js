"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationEvents = void 0;
class NotificationEvents {
    constructor(_socket, _io) {
        this._socket = _socket;
        this._io = _io;
    }
    register() {
        this._socket.on("joinVendorRoom", (vendorId) => {
            this._socket.join(`vendor_${vendorId}`);
            console.log(`Vendor_${vendorId} joined their room`);
        });
    }
}
exports.NotificationEvents = NotificationEvents;
