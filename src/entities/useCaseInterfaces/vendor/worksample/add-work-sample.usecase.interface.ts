import { IWorksampleDTO } from "@shared/dtos/work-sample.dto";



export interface IAddWorkSampleUseCase{
    execute(data:IWorksampleDTO,vendorId:string) : Promise<void>
}