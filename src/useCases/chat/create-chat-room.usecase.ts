import { IChatRoomRepository } from "@entities/repositoryInterfaces/chat/chat.repository.interface";
import { ICreateChatRoomUseCase } from "@entities/useCaseInterfaces/chat/createChatRoom.usecase.interface";
import { generateRandomUUID } from "@frameworks/security/randomid.bcrypt";
import { chatDTO } from "@shared/dtos/chat.dto";
import { inject, injectable } from "tsyringe";


@injectable()
export class CreateChatRoomUseCase implements ICreateChatRoomUseCase{

    constructor(
        @inject("IChatRoomRepository") private _chatRoomRepo : IChatRoomRepository,
    ){}

    async execute({ clientId, vendorId }: { clientId: string; vendorId: string; }): Promise<chatDTO> {
        
        const existing = await this._chatRoomRepo.getChatRoomByUserId(vendorId,clientId,"client")

        if(existing){
            return existing
        }

        const chatRoomId = generateRandomUUID()
        const newChat = this._chatRoomRepo.save({
            chatRoomId:chatRoomId,
            clientId:clientId,
            vendorId:vendorId,
        });


        return newChat
    }
}