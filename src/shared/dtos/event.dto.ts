import { IEventEntity } from "@entities/models/event.entity";

export interface IAddEventDTO {
  title: string;
  description: string;
  eventSchedule: {
    date: Date;
    startTime: string;
    endTime: string;
  }[];
  status: string;
  pricePerTicket: number;
  totalTicket: number;
  ticketLimit: number;
  eventLocation: string;
  location: {
    type: "Point";
    coordinates: number[];
  };
  Images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

type EditableFields = Pick<
  IAddEventDTO,
  | "title"
  | "description"
  | "pricePerTicket"
  | "totalTicket"
  | "ticketLimit"
  | "eventLocation"
  | "location"
  | "Images"
  | "eventSchedule"
>;

export type IUpdateEventDTO = Partial<EditableFields>;

export interface EventTableDTO {
  _id?: string;
  title: string;
  image: string;
  qrCode: string;
  vendorId: string;
  status: string;
  isActive?: boolean;
  pricePerTicket: number;
  totalTicket: number;
  eventSchedule: {
    date: Date;
    startTime: string;
    endTime: string;
  }[];
  tickets?: {
    ticketType?: string;
    pricePerTicket: number;
    totalTickets: number;
    maxTicketsPerUser: number;
  }[];
}

export interface PaginatedEventDetailsDTO {
  _id?: string;
  title: string;
  status: string;
  pricePerTicket: number;
  attendiesCount: number;
  eventLocation: string;
  images: string;
  description: string;
  eventSchedule: {
    date: Date;
    startTime: string;
    endTime: string;
  }[];
  tickets?: {
    pricePerTicket: number;
  }[];
}

export interface eventDetailsDTO {
  _id?: string;
  title: string;
  status: string;
  pricePerTicket?: number;
  totalTicket?: number;
  maxTicketPerUser?: number;
  attendiesCount: number;
  description?: string;
  eventLocation: string;
  eventSchedule: {
    date: Date;
    startTime: string;
    endTime: string;
  }[];
  tickets?: {
    ticketType?: string;
    pricePerTicket: number;
    totalTickets: number;
    maxTicketsPerUser: number;
  }[];
  vendor: {
    name: string;
    email: string;
    profilePicture: string;
    vendorId: string;
  };
  images: string[];

  location: {
    type: "Point";
    coordinates: number[];
  };
}

export interface IEventWithHost extends Omit<IEventEntity, "hostId"> {
  hostId: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface IEventVerifyAttendiesDTO {
  event: {
    eventId: string;
    image: string;
    title: string;
    eventLocation: string;
    eventSchedule: {
      date: Date;
      startTime: string;
      endTime: string;
    }[];
    totalTicket: number;
    bookedTickets: number;
  };
}

export interface IEventsByVendorsDTO {
   title:string
   image:string
   eventLocation:string
   description:string
  eventSchedule: {
      date: Date;
      startTime: string;
      endTime: string;
    }[];
    totalTickets:number
    pricePerTicket:number
  //   tickets?: {
  //   pricePerTicket: number;
  // }[];
    status:string
  hostId:{
    name:string
    profilePicture:string
  }
}
