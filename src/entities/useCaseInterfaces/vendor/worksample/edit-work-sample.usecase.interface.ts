import { TeditWorkSampleDTO } from "@shared/dtos/work-sample.dto";


export interface IEditWorkSampleUseCase{
    execute(data:TeditWorkSampleDTO,worksampleId:string) : Promise<void>
}