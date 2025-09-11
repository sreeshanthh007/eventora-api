"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ticketSchema = new mongoose_1.Schema({
    ticketId: { type: String, required: true },
    clientId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Client", required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    eventId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Event", required: true },
    qrCodeLink: { type: String, required: true },
    ticketStatus: { type: String, enum: ['used', 'refunded', 'unused'] },
    amount: { type: Number, required: false },
    ticketType: { type: String, required: false, default: "normal" },
    quantity: { type: Number, required: true }
});
