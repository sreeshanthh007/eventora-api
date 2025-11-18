import { IChatRoomRepository } from "@entities/repositoryInterfaces/chat/chat.repository.interface";
import { IUUIDGeneratorService } from "@entities/serviceInterfaces/generate-random-uuid.interface";
import { ICreateChatRoomUseCase } from "@entities/useCaseInterfaces/chat/createChatRoom.usecase.interface";
import { chatDTO } from "@shared/dtos/chat.dto";
import { inject, injectable } from "tsyringe";


@injectable()
export class CreateChatRoomUseCase implements ICreateChatRoomUseCase{

    constructor(
        @inject("IChatRoomRepository") private _chatRoomRepo : IChatRoomRepository,
        @inject("IUUIDGeneratorService") private _generateUUID : IUUIDGeneratorService
    ){}

    async execute({ clientId, vendorId }: { clientId: string; vendorId: string; }): Promise<chatDTO> {
        
        const existing = await this._chatRoomRepo.getChatRoomByUserId(vendorId,clientId,"client")

        if(existing){
            return existing
        }

        const chatRoomId = this._generateUUID.generate()
        const newChat = this._chatRoomRepo.save({
            chatRoomId:chatRoomId,
            clientId:clientId,
            vendorId:vendorId,
        });


        return newChat
    }
}