import { IWalletEntity } from "@entities/models/wallet.entity";
import { IWalletRepository, walletDetails } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { walletModel } from "@frameworks/database/mongodb/models/wallet.model";
import { TransactionDTO } from "@shared/dtos/wallet.dto";
import { FilterQuery, PipelineStage } from "mongoose";


export class WalletRepository implements IWalletRepository{
    
   async createWallet(walletDetails: walletDetails): Promise<void> {
       
        await walletModel.create(walletDetails)
   }


   async findWallet(userId: string): Promise<IWalletEntity | null> {
       return await walletModel.findOne({userId:userId})
   }


   async findWalletDetailsByUserId(userId: string, type:string,skip: number, limit: number): Promise<{ wallet: IWalletEntity | null; total: number; }> {
       
        let filter : FilterQuery<IWalletEntity> = {}

        switch (type) {
    case "credit":
      filter = { "transactions.paymentStatus": "credit" };
      break;
    case "debit":
      filter = { "transactions.paymentStatus": "debit" };
      break;
    default:
      filter = {};
  }

  const pipeline: PipelineStage[] = [
    { $match: { userId } },

    { $unwind: { path: "$transactions"} },

    { $match: filter },

    { $sort: { "transactions.createdAt": -1 } },

    { $skip: skip },

    { $limit: limit },

    {
      $group: {
        _id: "$_id",
        userId: { $first: "$userId" },
        balance: { $first: "$balance" },
        transactions: { $push: "$transactions" }
      }
    }
  ];

  const countPipeline: PipelineStage[] = [
    { $match: { userId } },
     { $unwind: { path: "$transactions"} },
    { $match: filter },
    { $count: "total" }
  ];

  const [walletResult, totalResult] = await Promise.all([
    walletModel.aggregate(pipeline),
    walletModel.aggregate(countPipeline),
  ]);


  

  const wallet = walletResult.length ? walletResult[0] : null;
  const total = totalResult.length ? totalResult[0].total : 0;

return { wallet, total };
}

  async findWalletByUserTypeAndUpdate(userType: string, transaction: TransactionDTO, amount: number): Promise<void> {
      await walletModel.findOneAndUpdate(
        {userType:userType},
        {$push:{transactions:transaction},$inc:{balance:amount}},
      )
  }

  async findWalletByUserIdAndUpdate(userId: string, transaction: TransactionDTO, amount: number): Promise<void> {
      await walletModel.findOneAndUpdate(
          {userId:userId},
          {$push:{transactions:transaction},$inc:{balance:amount}}
      )
  }


  async transfer(fromUserId: string, toUserId: string, amount: number, adminTransaction: TransactionDTO,vendorTransaction:TransactionDTO): Promise<void> {
      
        await walletModel.findOneAndUpdate(
            {userType:fromUserId},
            {
                $inc:{balance:-amount},

                  $push: { transactions: adminTransaction } 
            },
            
        );


        await walletModel.findOneAndUpdate(
            {userId:toUserId},

            {
                $inc:{balance:amount},

                  $push: { transactions: vendorTransaction } 
            }
        )
  }
   

}