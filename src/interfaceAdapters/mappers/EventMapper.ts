import { IEventEntity } from "@entities/models/event.entity";
import { TEventEntityWithVendorPopulated } from "@entities/models/populated-types/event-populated.type";
import { eventDetailsDTO, EventTableDTO, PaginatedEventDetailsDTO,IEventVerifyAttendiesDTO, IEventsByVendorsDTO} from "@shared/dtos/event.dto";
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
      qrCode:event.qrCode,
      vendorId:event.hostId.toString(),
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






export function mapEventsToEventDetailPage(event: TEventEntityWithVendorPopulated): eventDetailsDTO {
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
        }),
        vendor:{
          name:event.hostId.name,
          email:event.hostId.email,
          profilePicture:event.hostId.profilePicture,
          vendorId:event.hostId._id.toString()
        }
  };
}


export function mapEventsToClientEventPage(event:IEventEntity) : PaginatedEventDetailsDTO {
  return {
    _id:event._id?.toString(),
    title:event.title,
    status:event.status,
    pricePerTicket:
  event.pricePerTicket && event.pricePerTicket > 0
    ? event.pricePerTicket
    : (event.tickets && event.tickets.length > 0
        ? Math.min(...event.tickets.map(item => item.pricePerTicket))
        : 0),
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

export function mapEventForverifyAttendiestoDTO(event:IEventEntity) : IEventVerifyAttendiesDTO{
    const totalTicket =
    !event.totalTicket 
      ? event.tickets?.reduce((acc, t) => acc + (t.totalTickets ?? 0), 0) ?? 0
      : event.totalTicket;

  const bookedTickets =
    !event.bookedTickets 
      ? event.tickets?.reduce((acc, t) => acc + (t.bookedTickets ?? 0), 0) ?? 0
      : event.bookedTickets;

return{
    event:{
      eventId:event._id!.toString(),
      image:event.Images[0],
      title:event.title,
      eventLocation:event.eventLocation,
      eventSchedule:event.eventSchedule,
      totalTicket:totalTicket,
      bookedTickets: bookedTickets
    },
  }
}

export function mapEventsByVendorsToDTO(
  event: TEventEntityWithVendorPopulated
): IEventsByVendorsDTO {

  const pricePerTicket =
    event.pricePerTicket && event.pricePerTicket > 0
      ? event.pricePerTicket
      : event.tickets?.[0]?.pricePerTicket ?? 0;

   const totalTickets =
    event.totalTicket && event.totalTicket > 0
      ? event.totalTicket
      : event.tickets?.reduce((sum, t) => sum + t.totalTickets, 0) ?? 0;

  return {
    id:event._id!.toString(),
    title: event.title,
    image: event.Images?.[0] || "",
    eventLocation: event.eventLocation,
    description: event.description,

    eventSchedule: event.eventSchedule.map((s) => ({
      date: s.date,
      startTime: s.startTime,
      endTime: s.endTime,
    })),

    totalTickets,
    pricePerTicket,
    status: event.status,
    isActive:event.isActive!,
    hostId: {
      name: event.hostId.name,
      profilePicture: event.hostId.profilePicture,
    },
  };
}




