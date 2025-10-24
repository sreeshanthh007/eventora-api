

export interface IMessageEntity{
    messageId:string
    chatRoomId:string
    senderId:string
    receiverId:string
    messageType:"text" | "image" | "video",
    content:string
    mediaUrl:string
    status:"sent" | "delivered" | "read"
}