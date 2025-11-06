

export interface IReadMessageUseCase{
    execute({chatRoomId,userId}:{chatRoomId:string,userId:string}) :  Promise<void>
}