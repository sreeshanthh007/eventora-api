

 export interface SendMessageDTO {
  chatRoomId: string;
  senderId: string;
  receiverId: string;
  messageType: "text" | "image" | "video";
  content?: string;
  mediaUrl?: string;
}