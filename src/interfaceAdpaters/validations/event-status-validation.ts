import { CustomError } from "@entities/utils/custom.error";
import {  EVENT_STATUS_ERROR, HTTP_STATUS } from "@shared/constants";




export type EventStatus = "upcoming" | "ongoing" | "cancelled" | "completed";

export const validateEventStatus = (currentStatus:EventStatus,newStatus:EventStatus)=>{

 const allowedTransitions: Record<EventStatus, EventStatus[]> = {
    upcoming: ["upcoming", "cancelled", "ongoing", "completed"],
    cancelled: ["cancelled"],
    ongoing: ["ongoing", "completed"],
    completed: ["completed"]
  };


  const allowed = allowedTransitions[currentStatus]

  if(!allowed.includes(newStatus)){
    throw new CustomError(EVENT_STATUS_ERROR(currentStatus,newStatus),HTTP_STATUS.BAD_REQUEST);
  }
}