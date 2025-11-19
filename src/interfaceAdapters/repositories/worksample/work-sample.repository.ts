import { IWorkSampleEntity } from "@entities/models/work-sample.entity";
import { IWorkSampleRepository } from "@entities/repositoryInterfaces/vendor/worksample/work-sample.repository.interface";
import { workSampleModel } from "@frameworks/database/mongodb/models/workSample.model";
import { TeditWorkSampleDTO } from "@shared/dtos/work-sample.dto";
import { ObjectId } from 'mongodb'


export class WorkSampleRepository implements IWorkSampleRepository {

    async save(data: IWorkSampleEntity,vendorId:string): Promise<void> {
        const dataWithId = {...data,vendorId:new ObjectId(vendorId)}
        await workSampleModel.create(dataWithId)
    }

    async getWorkSampleData(vendorId: string): Promise<IWorkSampleEntity | null> {
        return await workSampleModel.findOne({vendorId:vendorId})
    }

    async findById(workSampleId: string): Promise<IWorkSampleEntity | null> {
        return await workSampleModel.findById(workSampleId)
    }

 async updateWorkSample(workSampleId: string, data: TeditWorkSampleDTO): Promise<void> {
    await workSampleModel.findByIdAndUpdate(
        workSampleId,
        { $set: data },
        { new: true }
    );
    }

    async getWorksampleForClients(vendorId: string): Promise<IWorkSampleEntity | null> {
        return await workSampleModel.findOne({vendorId:vendorId})
    }
}