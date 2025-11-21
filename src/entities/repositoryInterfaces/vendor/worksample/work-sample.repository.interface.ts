import { IWorkSampleEntity } from "@entities/models/work-sample.entity";
import { TeditWorkSampleDTO } from "@shared/dtos/work-sample.dto";


export interface IWorkSampleRepository {
    save(data:IWorkSampleEntity,vendorId:string) : Promise<void>

    getWorkSampleData(vendorId:string) : Promise<IWorkSampleEntity | null>

    findById(workSampleId:string) : Promise<IWorkSampleEntity | null>


    updateWorkSample(workSampleId:string,data:TeditWorkSampleDTO) : Promise<void>

    getWorksampleForClients(vendorId:string) : Promise<IWorkSampleEntity | null>
}