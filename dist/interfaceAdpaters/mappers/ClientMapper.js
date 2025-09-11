"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapClientAndVendorEntityToTableRow = mapClientAndVendorEntityToTableRow;
function mapClientAndVendorEntityToTableRow(client) {
    return {
        _id: client._id.toString(),
        name: client.name,
        email: client.email,
        phone: client.phone,
        status: (client.status == "blocked" ? "blocked" : "active")
    };
}
