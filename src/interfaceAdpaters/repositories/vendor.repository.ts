import { injectable } from "tsyringe";
import {
  IVendorModel,
  VendorModel,
} from "@frameworks/database/Mongodb/models/vendor.model";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { CustomError } from "@entities/utils/custom.error";
import { HTTP_STATUS, ERROR_MESSAGES } from "@shared/constants";
import { IVendorEntity } from "@entities/models/vendor.entity";

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

  async findByIdAndUpdateStatus(id: any, status: string): Promise<void> {
    await VendorModel.findByIdAndUpdate(id, {
      $set: {
        status: status,
      },
    });
  }

  async findByIdAndUpdatePassword(id: any, password: string): Promise<void> {
    await VendorModel.findByIdAndUpdate(id, {
      $set: {
        password: password,
      },
    });
  }

  async findPaginatedClients(
    filter: any,
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
}
