import { IWorkSampleResponseToVendorDTO } from "@shared/dtos/work-sample.dto";


export interface IGetworkSampleDataUseCase {
    execute(vendorId:string) : Promise<IWorkSampleResponseToVendorDTO>
}