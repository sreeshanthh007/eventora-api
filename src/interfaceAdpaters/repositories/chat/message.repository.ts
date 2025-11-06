import { IMessageEntity } from "@entities/models/message.entity";
import { IMessageRepository } from "@entities/repositoryInterfaces/chat/message.repository.interface";
import { messageModel } from "@frameworks/database/Mongodb/models/message.model";


export class MessageRepository implements IMessageRepository{

    async markMessageAsRead({ chatRoomId, userId }: { chatRoomId: string; userId: string; }): Promise<void> {
        
        await messageModel.updateMany(
            {
                chatRoomId,
                receiverId:userId,
                status:"sent"
            },
            {
                $set:{status:"read"}
            }
        )
    }


    async save(message: Partial<IMessageEntity>): Promise<Partial<IMessageEntity>> {
        await messageModel.create(message)

        return message
    }


}