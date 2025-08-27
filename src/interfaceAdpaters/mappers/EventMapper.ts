import { IEventEntity } from "@entities/models/event.entity";
import { EventTableDTO, IAddEventDTO } from "@shared/dtos/event.dto";
import { EventDTO } from "@shared/dtos/user.dto";


export function mapAddEventDTOToEntity(
  dto: IAddEventDTO,
  hostId: string
): IEventEntity {
  return {
    title: dto.title,
    description: dto.description,
    date: new Date(dto.date),
    startTime: dto.startTime,
    endTime: dto.endTime,
    pricePerTicket: dto.pricePerTicket,
    totalTicket: dto.totalTicket,
    eventLocation: dto.eventLocation,
    location: {
      type: "Point",
      coordinates: [dto.location.coordinates[0], dto.location.coordinates[1]],
    },
    Images: dto.Images,
    hostId,
    status: "upcoming",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export interface IEventReponse{
  title:string,
  description:string;
  date:Date;
  startTime:string;
  endTime:string;
  pricePerTicket:number;
  totalTicket:number;
  eventLocation:string;
    location: {
    type: "Point";
    coordinates: [number, number]; // 👈 tuple: exactly two numbers
  };
  images:string[];
}


export function mapEventEntityToTable (event:IEventEntity) : EventTableDTO{
    return {
        _id:event._id?.toString(),
        image : event.Images[0],
        title:event.title,
        status:event.status,
        pricePerTicket:event.pricePerTicket,
        totalTicket:event.totalTicket,
        isActive:event.isActive,
        startTime:event.startTime,
        endTime:event.endTime,
        date:event.date
    }
}

export function mapEventsForEditEvent(event:IEventEntity) : IEventReponse{
  return{
    title:event.title,
    description:event.description,
    date:event.date,
    startTime:event.startTime,
    endTime:event.endTime,
    eventLocation:event.eventLocation,
    location:{
      type:"Point",
      coordinates:[
        event.location.coordinates[0],
        event.location.coordinates[1]
      ] as [number,number]
    },
    pricePerTicket:event.pricePerTicket,
    totalTicket:event.totalTicket,
    images:event.Images
  }
}


export function mapEventsToLandingPage(event:IEventEntity) : EventDTO{
  return{
    title:event.title,
    date:event.date,
    eventLocation:event.eventLocation,
    pricePerTicket:event.pricePerTicket,
    images:event.Images[0]
  }
}

export const toClientLandingPage = (events:IEventEntity[]) : EventDTO[]=>{
  return events.map(mapEventsToLandingPage)
}