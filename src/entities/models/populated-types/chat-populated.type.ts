import { IChatRoomEntity } from "../chatRoom.entity";


export type TChatEntityWithPopulatedUsers = Omit<IChatRoomEntity,"clentId" | "vendorId"> &{
    clientId:{
        name:string,
        profileImage:string
    },
    vendorId:{
        name:string,
        profilePicture:string
    }
}