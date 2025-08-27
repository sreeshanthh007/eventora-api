"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSchema = void 0;
const mongoose_1 = require("mongoose");
exports.EventSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["upcoming", "completed", "cancelled", "onGoing"],
        default: "upcoming"
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    pricePerTicket: {
        type: Number,
        required: true,
        min: 0
    },
    totalTicket: {
        type: Number,
        required: true,
    },
    // ticketLimit:{
    //     type:Number,
    //     required:true,
    //     min:1
    // },
    eventLocation: {
        type: String,
        required: false
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    Images: [{
            type: String,
            required: true
        }],
    hostId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "vendors"
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});
exports.EventSchema.index({ location: "2dsphere" });
