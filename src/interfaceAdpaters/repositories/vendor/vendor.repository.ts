import { injectable } from "tsyringe";
import {
  VendorModel,
} from "@frameworks/database/Mongodb/models/vendor.model";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IVendorEntity } from "@entities/models/vendor.entity";
import { FilterQuery, ObjectId } from "mongoose";



@injectable()
export class VendorRepository implements IVendorRepository {
  async save(data: Partial<IVendorEntity>): Promise<IVendorEntity> {
    return await VendorModel.create(data);
  }

  async findByEmail(email: string): Promise<IVendorEntity | null> {
    return await VendorModel.findOne({ email });
  }

  async findById(id: string): Promise<IVendorEntity | null> {
    return await VendorModel.findById(id);
  }

  async findByIdAndUpdateStatus(id: string, status: string): Promise<void> {
    await VendorModel.findByIdAndUpdate(id, {
      $set: {
        status: status,
      },
      
    });
  }


  async findByIdandSaveFcmToken(id: string, fcmtoken: string): Promise<void> {
      await VendorModel.findByIdAndUpdate(id,
        {
          fcmToken:fcmtoken
        }
      )
  }

  async findByIdAndUpdatePassword(id: ObjectId, password: string): Promise<void> {
    await VendorModel.findByIdAndUpdate(id, {
      $set: {
        password: password,
      },
    });
  }

  async findPaginatedClients(
    filter: FilterQuery<IVendorEntity>,
    skip: number,
    limit: number
  ): Promise<{ user: IVendorEntity[] | []; total: number }> {
    const [user, total] = await Promise.all([
      VendorModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      VendorModel.countDocuments(filter),
    ]);

    return {
      user,
      total,
    };
  }

  async findPaginatedVendorByStatus( filter: FilterQuery<IVendorEntity>, skip: number, limit: number): Promise<{ vendors: IVendorEntity[] | []; total: number; }> {
      const [vendors,total] = await Promise.all([
        VendorModel.find(filter)
        .sort({createdAt:-1})
        .skip(skip)
        .limit(limit),
        VendorModel.countDocuments(filter)
      ]);
      return {
        vendors,
        total
      }
  }


  async findByIdAndUpdateProfileImage(userId: string, profileImage: string): Promise<void> {
      await VendorModel.findByIdAndUpdate(userId,
        {
          $set:{profilePicture : profileImage}
        }
      )
  }

  async updatePersonalInformation(id: string, data: Partial<IVendorEntity>): Promise<void> {
     await VendorModel.findByIdAndUpdate(id,data,
      {
        new:true
      }
     )

  }

  async findByIdAndUpdateVendorStatus(id: string, status: string,rejectReason?:string): Promise<void> {
      await VendorModel.findByIdAndUpdate(id,{
        $set:{
          vendorStatus:status,
          rejectionReason:rejectReason
        }
      });
  }
}
