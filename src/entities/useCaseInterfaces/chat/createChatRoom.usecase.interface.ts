import { chatDTO } from "@shared/dtos/chat.dto";


export interface ICreateChatRoomUseCase{
    execute({clientId,vendorId}:{clientId:string,vendorId:string}) : Promise<chatDTO>
}