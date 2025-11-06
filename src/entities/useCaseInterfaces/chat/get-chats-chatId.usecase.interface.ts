import { chatDTO } from "@shared/dtos/chat.dto";


export interface IGetChatByChatIdUseCase{
    execute(chatId:string,role:"client" | "vendor") : Promise<chatDTO>
}