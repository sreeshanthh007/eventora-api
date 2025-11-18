import { IChatController } from "@entities/controllerInterfaces/chat/chat.controller.interface";
import { IGetAllChatsByUserUseCase } from "@entities/useCaseInterfaces/chat/get-all-chats-user.usecase.interface";
import { IGetChatByuserUseCase } from "@entities/useCaseInterfaces/chat/get-chat-user.usecase.interface";
import { IGetChatByChatIdUseCase } from "@entities/useCaseInterfaces/chat/get-chats-chatId.usecase.interface";
import { CustomRequest } from "@middlewares/auth.middleware";
import { ERROR_MESSAGES, HTTP_STATUS} from "@shared/constants";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";


@injectable()
export class ChatController implements IChatController{

    constructor(
        @inject("IGetAllChatsByUserUseCase") private _getAllChatsByUserUserUseCase : IGetAllChatsByUserUseCase,
        @inject("IGetChatByChatIdUseCase") private _getChatbyChatIdUseCase : IGetChatByChatIdUseCase,
        @inject("IGetChatbyUserUseCase") private _getChatbyUserUseCase : IGetChatByuserUseCase
    ){}


    async getAllChatsByUserId(req: Request, res: Response): Promise<void> {
        
        const {id,role} = (req as CustomRequest).user

        if(!id){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
            return
        }

        const chats = await this._getAllChatsByUserUserUseCase.execute(id,role as "client" | "vendor")

        res.status(HTTP_STATUS.OK)
        .json({success:true,chats})


    }


    async getChatbyChatId(req: Request, res: Response): Promise<void> {

        const {role,id:currentUserId} = (req as CustomRequest).user
      
        const {userId:opponentUserId,chatId} = req.query
      

        if(!currentUserId){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS});
            return
        }


        if(chatId){
           const chat =  await this._getChatbyChatIdUseCase.execute(String(chatId),role as "client" | "vendor");


            res.status(HTTP_STATUS.OK)
            .json({success:true,chat})
            return
        }

        if(!opponentUserId || !currentUserId){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
            return
        }

        const chat = await this._getChatbyUserUseCase.execute(String(opponentUserId),currentUserId,role)


        res.status(HTTP_STATUS.OK)
        .json({success:true,chat})
    }
}