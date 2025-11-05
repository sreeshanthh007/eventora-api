import { IChatRoomEntity } from "@entities/models/chatRoom.entity";


export interface IChatRoomRepository{
    save(chatRoom:IChatRoomEntity) : Promise<IChatRoomEntity>
    getChatRoomByChatId(chatId:string,userRole:"client"|"vendor") : Promise<IChatRoomEntity | null>
    getChatRoomByUserId(opponentUserId:string,currentUserId:string,currentUserRole:"client" | "vendor") : Promise<IChatRoomEntity | null>
    getAllChatsByUserId(userId:string,userRole:"client"|"vendor") : Promise<IChatRoomEntity[]>
    findChatRoom({clientId,vendorId} : {clientId:string,vendorId:string}) : Promise<IChatRoomEntity | null>
}