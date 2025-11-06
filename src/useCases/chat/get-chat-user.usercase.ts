import { IChatRoomRepository } from "@entities/repositoryInterfaces/chat/chat.repository.interface";
import { ICreateChatRoomUseCase } from "@entities/useCaseInterfaces/chat/createChatRoom.usecase.interface";
import { IGetChatByuserUseCase } from "@entities/useCaseInterfaces/chat/get-chat-user.usecase.interface";
import { chatDTO } from "@shared/dtos/chat.dto";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetChatbyUserUseCase implements IGetChatByuserUseCase{
    constructor(
        @inject("IChatRoomRepository") private _chatRoomRepo : IChatRoomRepository,
        @inject("ICreateChatRoomUseCase") private _createChatRoomUseCase : ICreateChatRoomUseCase
    ){}


    async execute(opponentUserId: string, currentUserId: string, currentUserRole: string): Promise<chatDTO | null> {
        
        const isClient = currentUserRole=="client"

        const isChatRoomExist = await this._chatRoomRepo.findChatRoom({
            clientId:isClient ? currentUserId : opponentUserId,
            vendorId:isClient ? opponentUserId : currentUserId
        });

        if(!isChatRoomExist){
            await this._createChatRoomUseCase.execute({
                clientId:isClient ? currentUserId : opponentUserId,
                vendorId:isClient ? opponentUserId :currentUserId
            });
        }

        const chat = await this._chatRoomRepo.getChatRoomByUserId(opponentUserId,currentUserId,currentUserRole as "client" | "vendor");

      
        return chat
    }
}