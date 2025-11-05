

 export interface SendMessageDTO {
  messageId:string
  chatRoomId: string;
  senderId: string;
  receiverId: string;
  messageType: "text" | "image" | "video";
  content?: string;
  mediaUrl?: string;
}

export interface ReadMessageDTO{
  chatRoomId:string
  userId:string
}
