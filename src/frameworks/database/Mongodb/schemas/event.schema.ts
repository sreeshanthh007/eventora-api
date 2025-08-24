import { Schema } from "mongoose";
import { IEventModel } from "../models/event.model";


export const EventSchema : Schema = new Schema<IEventModel>(
    {
        title:{
            type:String,
            required:true
        },

        description:{
            type:String,
            required:true
        },

        date:{
            type:Date,
            required:true
        },

        status: {
        type: String,
        enum: ["upcoming", "completed", "cancelled", "onGoing"],
        default: "upcoming"
    },

        startTime:{
            type:String,
            required:true
        },

        endTime:{
            type:String,
            required:true
        },

        pricePerTicket:{
            type:Number,
            required:true,
            min:0
        },
        totalTicket:{
            type:Number,
            required:true,  
        },
        // ticketLimit:{
        //     type:Number,
        //     required:true,
        //     min:1
        // },

        eventLocation:{
            type:String,
            required:false
        },

    coordinates: {
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

    Images:[{
        type:String,
        required:true
    }],

    hostId : {
        type:Schema.Types.ObjectId,
        ref:"vendors"
    },
    
    isActive:{
        type:Boolean,
        default:true
    },

    },

    {
        timestamps:true
    }
)


EventSchema.index({coordinates:"2dsphere"})