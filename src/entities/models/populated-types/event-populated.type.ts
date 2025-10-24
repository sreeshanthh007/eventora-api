import { IEventEntity } from "../event.entity";
import { IVendorEntity } from "../vendor.entity";

export type TEventEntityWithVendorPopulated = Omit<IEventEntity,"hostId"> &{
    hostId:IVendorEntity
}