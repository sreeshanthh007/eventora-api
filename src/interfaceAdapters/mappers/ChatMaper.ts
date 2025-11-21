import { IChatRoomEntity } from "@entities/models/chatRoom.entity";
import { chatDTO } from "@shared/dtos/chat.dto";



export function mapChatToDTO(chat:IChatRoomEntity) : chatDTO{
    return {
        chatRoomId:chat.chatRoomId,
        clientId:chat.clientId,
        vendorId:chat.vendorId,
        createdAt:chat.createdAt,
        updatedAt:chat.updatedAt
    }
}