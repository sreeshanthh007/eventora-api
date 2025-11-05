import { IChatRoomRepository } from "@entities/repositoryInterfaces/chat/chat.repository.interface";
import { IGetChatByChatIdUseCase } from "@entities/useCaseInterfaces/chat/get-chats-chatId.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { chatDTO } from "@shared/dtos/chat.dto";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetChatByChatIdUseCase implements IGetChatByChatIdUseCase{

    constructor(
        @inject("IChatRoomRepository") private _chatRoomRepo : IChatRoomRepository
    ){}


    async execute(chatId: string, role: "client" | "vendor"): Promise<chatDTO> {
        

        const chat = await this._chatRoomRepo.getChatRoomByChatId(
            chatId,
            role
        );


        if(!chat){
            throw new CustomError(ERROR_MESSAGES.CHAT_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        return chat
    }
}