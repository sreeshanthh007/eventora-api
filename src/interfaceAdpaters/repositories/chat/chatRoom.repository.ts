import { IChatRoomEntity } from "@entities/models/chatRoom.entity";
import { IChatRoomRepository } from "@entities/repositoryInterfaces/chat/chat.repository.interface";
import { chatModel } from "@frameworks/database/Mongodb/models/chatRoom.model";


export class ChatRoomRepository implements IChatRoomRepository{


    async save(chatRoom: IChatRoomEntity): Promise<IChatRoomEntity> {
        const created = await chatModel.create(chatRoom)

          return created
    }

    async getAllChatsByUserId(userId: string, userRole: "client" | "vendor"): Promise<IChatRoomEntity[]> {
        const matchQuery = userRole === "client" ? { clientId: userId } : { vendorId: userId };
        const chatRooms = await chatModel.aggregate([
        { $match: matchQuery },

      
        {
            $addFields: {
                clientIdObj: { $toObjectId: "$clientId" },
                vendorIdObj: { $toObjectId: "$vendorId" }
            }
        },

       
        { $lookup: { from: "clients", localField: "clientIdObj", foreignField: "_id", as: "clientDetails" } },
        { $unwind: "$clientDetails" },

      
        { $lookup: { from: "vendors", localField: "vendorIdObj", foreignField: "_id", as: "vendorDetails" } },
        { $unwind: "$vendorDetails" },

       
        {
            $lookup: {
                from: "messages",
                let: { chatRoomId: "$chatRoomId" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$chatRoomId", "$$chatRoomId"] } } },
                    { $sort: { createdAt: -1 } },
                    { $limit: 1 }
                ],
                as: "lastMessage"
            }
        },
        { $unwind: { path: "$lastMessage", preserveNullAndEmptyArrays: true } },

        {
            $project: {
                chatRoomId: 1,
                clientId: 1,
                vendorId: 1,
                createdAt: 1,
                clientDetails: { name: 1, profileImage: 1 },
                vendorDetails: { name: 1, profilePicture: 1 },
                lastMessage: { senderId: 1, content: 1, messageType: 1, createdAt: 1 }
            }
        },

        { $sort: { "lastMessage.createdAt": -1, createdAt: -1 } }
    ]);
    return chatRooms;
    }

    async getChatRoomByChatId(chatId: string, userRole: "client" | "vendor"): Promise<IChatRoomEntity | null> {
          const matchQuery =
      userRole === "client"
        ? { chatRoomId: chatId}
        : { chatRoomId: chatId};

        const chatRoom = await chatModel.aggregate([
            { $match: matchQuery },


            {
            $addFields: {
                clientIdObj: { $toObjectId: "$clientId" },
                vendorIdObj: { $toObjectId: "$vendorId" }
            }
        },

            {
            $lookup: {
                from: "clients",
                localField: "clientIdObj",
                foreignField: "_id",
                as: "clientDetails",
            },
            },
            { $unwind: { path: "$clientDetails", preserveNullAndEmptyArrays: true } },

            {
            $lookup: {
                from: "vendors",
                localField: "vendorIdObj",
                foreignField: "_id",
                as: "vendorDetails",
            },
            },
            { $unwind: { path: "$vendorDetails", preserveNullAndEmptyArrays: true } },


            {
            $lookup: {
                from: "messages",
                let: { chatRoomId: "$chatRoomId" },
                pipeline: [
                { $match: { $expr: { $eq: ["$chatRoomId", "$$chatRoomId"] } } },
                { $sort: { createdAt: 1 } } 
                ],
                as: "messages",
            },
            },
        ]);

        return chatRoom[0] || null;
        }

    async getChatRoomByUserId(opponentUserId: string, currentUserId: string, currentUserRole: "client" | "vendor"): Promise<IChatRoomEntity | null> {
    const query =
        currentUserRole === "client"
    ? { clientId: currentUserId, vendorId: opponentUserId }
    : { clientId: opponentUserId, vendorId: currentUserId };

     const chatRoom = await chatModel.aggregate([
    { $match: query },


    {
      $addFields: {
        clientIdObj: { $toObjectId: "$clientId" },
        vendorIdObj: { $toObjectId: "$vendorId" },
      },
    },

 
            {
            $lookup: {
                from: "clients",
                localField: "clientIdObj",
                foreignField: "_id",
                as: "clientDetails",
            },
            },
            { $unwind: { path: "$clientDetails", preserveNullAndEmptyArrays: true } },

       
            {
            $lookup: {
                from: "vendors",
                localField: "vendorIdObj",
                foreignField: "_id",
                as: "vendorDetails",
            },
            },
            { $unwind: { path: "$vendorDetails", preserveNullAndEmptyArrays: true } },

          
            {
            $lookup: {
                from: "messages",
                let: { chatRoomId: "$chatRoomId" },
                pipeline: [
                { $match: { $expr: { $eq: ["$chatRoomId", "$$chatRoomId"] } } },
                { $sort: { createdAt: 1 } }, // chronological order
                ],
                as: "messages",
            },
            },

            {
            $project: {
                chatRoomId: 1,
                clientId: 1,
                vendorId: 1,
                createdAt: 1,
                updatedAt: 1,
                clientDetails: { name: 1, profileImage: 1 },
                vendorDetails: { name: 1, profilePicture: 1 },
                messages: 1,
            },
            },
        ]);


        return chatRoom[0] || null;
        }

    async findChatRoom({ clientId, vendorId }: { clientId: string; vendorId: string; }): Promise<IChatRoomEntity | null> {
        return await chatModel.findOne({
            clientId:clientId,
            vendorId:vendorId
        })
    }
}