import { IMessageEntity } from "@entities/models/message.entity";
import { IMessageRepository } from "@entities/repositoryInterfaces/chat/message.repository.interface";
import { ISendMessageUseCase } from "@entities/useCaseInterfaces/chat/send-message.usecase.interface";
import { inject, injectable } from "tsyringe";


@injectable()
export class SendMessageUseCase implements ISendMessageUseCase{

    constructor(
        @inject("IMessageRepository") private _messageRepo : IMessageRepository
    ){}


    async execute(data: Partial<IMessageEntity>): Promise<Partial<IMessageEntity>> {
        
        const message = await this._messageRepo.save(data)

        return message
    }
}