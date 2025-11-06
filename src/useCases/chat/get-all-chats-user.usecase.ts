import { IChatRoomRepository } from "@entities/repositoryInterfaces/chat/chat.repository.interface";
import { IGetAllChatsByUserUseCase } from "@entities/useCaseInterfaces/chat/get-all-chats-user.usecase.interface";
import { chatDTO } from "@shared/dtos/chat.dto";
import { inject, injectable } from "tsyringe";


@injectable()

export class GetAllChatsByUserUseCase implements IGetAllChatsByUserUseCase{

    constructor(
        @inject("IChatRoomRepository") private _chatRoomRepo : IChatRoomRepository
    ){}

    async execute(userId: string, role: "client" | "vendor"): Promise<chatDTO[]> {
        
        const chats = await this._chatRoomRepo.getAllChatsByUserId(
            userId,
            role
        );
      
        return chats
    }
}