"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ServiceSchema = new mongoose_1.Schema({
    vendorId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Vendor", required: true },
    yearsOfExperience: { type: Number, required: true },
    availableDates: [
        {
            date: { type: String, required: true },
            timeSlots: [
                {
                    startTime: { type: String, required: true },
                    endTime: { type: String, required: true },
                    capacity: { type: Number, required: true },
                    count: { type: Number, default: 0 }
                },
            ],
        }
    ],
    serviceDescription: { type: String, required: true },
    serviceDuration: { type: Number, required: true },
    servicePrice: { type: Number, required: true },
    additionalHourPrice: { type: Number, required: true },
    cancellationPolies: { type: [String], required: true },
    termsAndConditions: { type: [String], required: true }
});
