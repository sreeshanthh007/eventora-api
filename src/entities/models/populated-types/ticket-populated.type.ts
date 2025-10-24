import { IEventEntity } from "../event.entity";
import { ITicketEntity } from "../ticket.entity";

export type TTicketEntityWithEventPopulated = Omit<ITicketEntity, "eventId"> & {
  eventId: Pick<IEventEntity, "Images" | "eventSchedule" | "_id">;
};