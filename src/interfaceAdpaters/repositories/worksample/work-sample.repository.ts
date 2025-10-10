import { IWorkSampleEntity } from "@entities/models/work-sample.entity";
import { IWorkSampleRepository } from "@entities/repositoryInterfaces/vendor/worksample/work-sample.repository.interface";
import { workSampleModel } from "@frameworks/database/Mongodb/models/workSample.model";


export class WorkSampleRepository implements IWorkSampleRepository {

    async save(data: IWorkSampleEntity): Promise<void> {
        await workSampleModel.create(data)
    }

    async getWorkSampleData(vendorId: string): Promise<IWorkSampleEntity | null> {
        return await workSampleModel.findOne({vendorId:vendorId})
    }
}