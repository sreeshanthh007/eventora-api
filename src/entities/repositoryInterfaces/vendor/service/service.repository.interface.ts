import { IServiceEntity } from "@entities/models/service.entity";

export interface IServiceRepository {
  save(data: IServiceEntity): Promise<void>;

//   saveCount(
//     serviceId: any,
//     dateString: string,
//     startTime: string,
//     endTime: string
//   ): Promise<void>;

//   findByVendorId(
//     id: any,
//     skip: number,
//     limit: number
//   ): Promise<PaginatedServices>;

//   findByVendorIdForVendorProfileInClient(
//     id: any,
//     skip: number,
//     limit: number
//   ): Promise<PaginatedVendorServices>;

//   findById(id: any): Promise<IServiceEntity | null>;

//   findByIdAndUpdate(id: any, data: IServiceEntity): Promise<void>;

//   findAllServiceByVendorId(id: any): Promise<IServiceEntity[] | []>;
}