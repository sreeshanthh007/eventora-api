import { IEventEntity } from "@entities/models/event.entity";
import { EventTableDTO, IAddEventDTO } from "@shared/dtos/event.dto";


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
    ticketLimit: dto.ticketLimit,
    eventLocation: dto.eventLocation,
    coordinates: {
      type: "Point",
      coordinates: [dto.coordinates.coordinates[0], dto.coordinates.coordinates[1]],
    },
    Images: dto.Images,
    hostId,
    status: "upcoming",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}


export function mapEventEntityToTable (event:IEventEntity) : EventTableDTO{
    return {
        _id:event._id?.toString(),
        image : event.Images[0],
        title:event.title,
        status:event.status,
        pricePerTicket:event.pricePerTicket,
        totalTicket:event.totalTicket,
        isActive:event.isActive
    }
}