import { IMessageEntity } from "@entities/models/message.entity"

export interface IMessageRepository{
    save(message:Partial<IMessageEntity>) : Promise<Partial<IMessageEntity>>
    markMessageAsRead({
        chatRoomId,
        userId
    }:{
        chatRoomId:string
        userId:string
    }) : Promise<void>
}