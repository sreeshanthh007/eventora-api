import { chatDTO } from "@shared/dtos/chat.dto";


export interface IGetAllChatsByUserUseCase{
    execute(userId:string,role:"client" | "vendor") : Promise<chatDTO[]>
}