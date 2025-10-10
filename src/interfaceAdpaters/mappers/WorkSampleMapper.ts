import { IWorkSampleEntity } from "@entities/models/work-sample.entity";
import { IWorkSampleResponseDTO } from "@shared/dtos/work-sample.dto";



export function mapToWorkSampleDTO(workSample:IWorkSampleEntity) : IWorkSampleResponseDTO{

        return{
            // _id:workSample._id.toString(),
            title:workSample.title,
            description:workSample.description,
            images:workSample.images
        }
}