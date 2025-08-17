import { IServiceEntity } from "@entities/models/service.entity";
import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { serviceModel } from "@frameworks/database/Mongodb/models/service.model";


export class ServiceRepository implements IServiceRepository{
     async save(data: IServiceEntity): Promise<void> {
    await serviceModel.create(data);
  }
}