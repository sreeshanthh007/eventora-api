import { chatDTO } from "@shared/dtos/chat.dto";


export interface IGetChatByuserUseCase{
    execute(opponentUserId:string,currentUserId:string,currentUserRole:string) : Promise<chatDTO | null>
}