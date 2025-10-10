import { IVendorController } from "@entities/controllerInterfaces/vendor/vendor-controller.interface";
import { IChangeVendorPasswordUseCase } from "@entities/useCaseInterfaces/vendor/change-password-vendor.usecase.interface";
import { IUpdateVendorPersonalInformationUseCase } from "@entities/useCaseInterfaces/vendor/update-vendor-personal.usecase.interface";
import { IAddWorkSampleUseCase } from "@entities/useCaseInterfaces/vendor/worksample/add-work-sample.usecase.interface";


import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";
import { UpdatePasswordDTO } from "@shared/dtos/user.dto";
import { Request, Response } from "express";
import { CustomRequest } from "interfaceAdpaters/middlewares/auth.middleware";
import { updateVendorProfileSchema } from "interfaceAdpaters/validations/vendor.validation";
import { workSampleSchema } from "interfaceAdpaters/validations/work-sample.validation";
import { ObjectId } from "mongoose";
import { inject, injectable } from "tsyringe";







@injectable()
export class VendorController implements IVendorController{
    constructor(
        @inject("IUpdateVendorPersonalInformationUseCase") private _updateVendorPersonalInformation : IUpdateVendorPersonalInformationUseCase,
        @inject("IChangeVendorPasswordUseCase") private _changeVendorPasswordUseCase : IChangeVendorPasswordUseCase,
        @inject("IAddWorkSampleUseCase") private _addWorkSampleUseCase : IAddWorkSampleUseCase,

    ){}

    async updatePersonalInformation(req: Request, res: Response): Promise<void> {
        
        const {id} = (req as CustomRequest).user

        const data = req.body

        const validatedData = updateVendorProfileSchema.parse(data)

        await this._updateVendorPersonalInformation.execute(id,validatedData)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.UPDATE_SUCCESS})

    }


    async changePassword(req: Request, res: Response): Promise<void> {

        const {id} = (req as CustomRequest).user

        const {currentPassword,newPassword} = req.body as UpdatePasswordDTO


        if(!currentPassword || !newPassword || !id){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS});
            return
        }

        await this._changeVendorPasswordUseCase.execute(id,currentPassword,newPassword)


        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.UPDATE_PASSWORD_SUCCESS})
    }

    
    async addWorkSample(req: Request, res: Response): Promise<void> {
        
        const {data} = req.body

        const {id} = (req as CustomRequest).user

        if(!id){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS});
            return
        }
        const validatedData = workSampleSchema.parse(data)

        const dataWithVendorId = {...validatedData,vendorId:id as unknown as ObjectId}

        await this._addWorkSampleUseCase.execute(dataWithVendorId,id)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.CREATED})
    }


  
}