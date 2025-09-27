import { IEventEntity } from "@entities/models/event.entity";
import { eventDetailsDTO, EventTableDTO, PaginatedEventDetailsDTO} from "@shared/dtos/event.dto";
import { EventDTO } from "@shared/dtos/user.dto";





type eventType = "row" | "normal"
export interface IEventReponse{
  eventType:eventType
  title:string,
  description:string;
  pricePerTicket:number;
  totalTicket:number;
  maxTicketPerUser:number
  eventLocation:string;
   eventSchedule: {
    date: Date;
    startTime: string;
    endTime: string;
  }[];
    tickets?: {
    ticketType: string;
    pricePerTicket: number;
    totalTickets: number;
    maxTicketsPerUser: number;
  }[];
    location: {
    type: "Point";
    coordinates: [number, number]; 
  };
  images:string[];
}


export function mapEventEntityToTable (event:IEventEntity) : EventTableDTO{
    return {
        _id:event._id?.toString(),
        image : event.Images[0],
        title:event.title,
        status:event.status,
        pricePerTicket: event.pricePerTicket || event.tickets?.[0]?.pricePerTicket || 0,

        totalTicket: event.totalTicket || event.tickets?.[0]?.totalTickets || 0,
        isActive:event.isActive,
  eventSchedule: event.eventSchedule?.map(schedule => ({
      date: schedule.date,
      startTime: schedule.startTime,
      endTime: schedule.endTime
    })) || [],
    }
}

export function mapEventsForEditEvent(event:IEventEntity) : IEventReponse{
  return{
    title:event.title,
    description:event.description,
  eventSchedule: event.eventSchedule?.map(schedule => ({
      date: schedule.date,
      startTime: schedule.startTime,
      endTime: schedule.endTime
    })),
    eventLocation:event.eventLocation,
    location:{
      type:"Point",
      coordinates:[
        event.location.coordinates[0],
        event.location.coordinates[1]
      ] as [number,number]
    },
    tickets:event.tickets && event.tickets?.length > 0 ? event.tickets : [],
    pricePerTicket:event.pricePerTicket,
    totalTicket:event.totalTicket,
    images:event.Images,
    maxTicketPerUser : event.maxTicketPerUser!,
    eventType: event.tickets && event.tickets.length > 0 ? "row" : "normal"
  }
}


export function mapEventsToLandingPage(event:IEventEntity) : EventDTO{
  return{
    eventId:event._id?.toString(),
    title:event.title,
    eventLocation:event.eventLocation,
    pricePerTicket:event.pricePerTicket,
    attendiesCount:event.attendiesCount,
    images:event.Images[0],
    eventSchedule:event.eventSchedule.map(schedule => ({
      date:schedule.date,
      startTime:schedule.startTime,
      endTime:schedule.endTime
    }))
  }
}

export const toClientLandingPage = (events:IEventEntity[]) : EventDTO[]=>{
  return events.map(mapEventsToLandingPage)
}






export function mapEventsToEventDetailPage(event: IEventEntity): eventDetailsDTO {
  return {
    _id: event._id?.toString(),
    title: event.title,
    status: event.status,
    location: event.location,
    images: event.Images,
    attendiesCount: event.attendiesCount,
    eventLocation:event.eventLocation,
    description:event.description,
    eventSchedule: event.eventSchedule.map(s => ({
      date: s.date,
      startTime: s.startTime,
      endTime: s.endTime
    })),
    ...(event.tickets && event.tickets.length > 0
      ? {
          tickets: event.tickets 
        }
      : {
          pricePerTicket: event.pricePerTicket,
          totalTicket: event.totalTicket,
          maxTicketPerUser: event.maxTicketPerUser
        })
  };
}


export function mapEventsToClientEventPage(event:IEventEntity) : PaginatedEventDetailsDTO {
  return {
    _id:event._id?.toString(),
    title:event.title,
    status:event.status,
    pricePerTicket: event.pricePerTicket 
  ?? Math.max(...(event.tickets?.map(item => item.pricePerTicket) ?? [])),
    attendiesCount:event.attendiesCount,
    eventLocation:event.eventLocation,
    images:event.Images[0],
    description:event.description,
    eventSchedule:event.eventSchedule.map(s => ({
      date:s.date,
      startTime:s.startTime,
      endTime:s.endTime
    })),
  }
}



