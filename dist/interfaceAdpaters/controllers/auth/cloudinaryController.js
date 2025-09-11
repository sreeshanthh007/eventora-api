"use strict";
// import { ICloudinarySignatureService } from "@entities/serviceInterfaces/cloudinary-service.interface";
// import { ICloudinaryController } from "@entities/controllerInterfaces/auth/cloudinary-controller";
// import { inject, injectable } from "tsyringe";
// import { Request, Response } from "express";
// import { CustomError } from "@entities/utils/custom.error";
// import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
// @injectable()
// export class CloudinaryController implements ICloudinaryController{
//     constructor(
//         @inject("ICloudinarySignatureService") private cloudinaryService : ICloudinarySignatureService
//     ){}
//     async getUploadSignature(req: Request, res: Response): Promise<void> {
//         const folder  = req.query.folder
//         if(!folder){
//             throw new CustomError(ERROR_MESSAGES.FOLDER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
//         }
//         const data =  this.cloudinaryService.generateSignature(folder as string)
//         console.log("the data from folder",data)
//         res.json(data)
//     }
// }
