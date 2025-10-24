import { IWorkSampleEntity } from "@entities/models/work-sample.entity";
import { IWorkSampleResponseToVendorDTO, WorkSampleResponseDTO } from "@shared/dtos/work-sample.dto";



export function mapToWorkSampleDTO(workSample:IWorkSampleEntity) : IWorkSampleResponseToVendorDTO{

        return{
            _id:workSample._id!.toString(),
            title:workSample.title,
            description:workSample.description,
            images:workSample.images
        }
}


export function mapWorksampleForClient(worksample:IWorkSampleEntity) : WorkSampleResponseDTO{

    return{
        title:worksample.title,
        description:worksample.description,
        images:worksample.images,
    }
}