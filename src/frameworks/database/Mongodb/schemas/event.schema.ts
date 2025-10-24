import { Schema } from "mongoose";
import { IEventModel } from "../models/event.model";

export const EventSchema: Schema = new Schema<IEventModel>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    status: {
      type: String,
      enum: ["upcoming", "completed", "cancelled", "ongoing"],
      default: "upcoming",
    },

    eventSchedule: [
      {
        date: { type: Date, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
      },
    ],

 
    pricePerTicket: { type: Number, required: false, min: 0 , default:null},
    totalTicket: { type: Number, required: false, min: 0 ,default:null},
    bookedTickets: { type: Number, default: 0, min: 0, },
    maxTicketPerUser: { type: Number, required: false, min: 1,default:null },

 
    tickets: [
      {
        ticketType: { type: String, required: true }, 
        pricePerTicket: { type: Number, required: true, min: 0},
        totalTickets: { type: Number, required: true, min: 0},
        bookedTickets: { type: Number, default: 0, min: 0 },
        maxTicketsPerUser: { type: Number, required: true, min: 1 , default:0 },
      },
    ],

    eventLocation: { type: String },

    attendiesCount:{type:Number,default:0},

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: { type: [Number], required: true },
    },

    Images: [{ type: String, required: true }],

    qrCode:{type:String,required:true},

    hostId: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

EventSchema.index({ location: "2dsphere" });
