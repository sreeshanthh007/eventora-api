import { IMessageRepository } from "@entities/repositoryInterfaces/chat/message.repository.interface";
import { IReadMessageUseCase } from "@entities/useCaseInterfaces/chat/read-message.usecase.interface";
import { inject, injectable } from "tsyringe";


@injectable()
export class ReadMessageUseCase implements IReadMessageUseCase{

    constructor(
        @inject("IMessageRepository") private _messageRepo: IMessageRepository
    ){}


    async execute({ chatRoomId, userId }: { chatRoomId: string; userId: string; }): Promise<void> {
        
       return await this._messageRepo.markMessageAsRead({
            chatRoomId,
            userId
        });
    }
}