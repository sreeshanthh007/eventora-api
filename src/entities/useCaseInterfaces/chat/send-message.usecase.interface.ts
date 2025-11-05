import { IMessageEntity } from "@entities/models/message.entity";


export interface ISendMessageUseCase{
    execute(data:Partial<IMessageEntity>) : Promise<Partial<IMessageEntity>>
}