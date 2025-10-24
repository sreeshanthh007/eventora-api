import { WorkSampleResponseDTO } from "@shared/dtos/work-sample.dto";


export interface IGetVendorWorkFolioUseCase{
    execute(vendorId:string) : Promise<WorkSampleResponseDTO>
}