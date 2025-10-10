import { IWorkSampleEntity } from "@entities/models/work-sample.entity";


export interface IWorkSampleRepository {
    save(data:IWorkSampleEntity) : Promise<void>
    getWorkSampleData(vendorId:string) : Promise<IWorkSampleEntity | null>
}