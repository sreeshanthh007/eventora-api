"use strict";
// import { IRequestedVendors } from "@entities/controllerInterfaces/admin/get-requested-vendors";
// import { IGetRequestedVendorsUseCase } from "@entities/useCaseInterfaces/admin/get-requested-vendors.usecase";
// import { HTTP_STATUS} from "@shared/constants";
// import { Request, Response } from "express";
// import { inject, injectable } from "tsyringe";
// @injectable()
// export class GetRequestedVendorsController implements IRequestedVendors{
//     constructor(
//         @inject("IGetRequestedVendorUseCase") private getRequestedVendors : IGetRequestedVendorsUseCase
//     ){}
//     async handle(req: Request, res: Response): Promise<void> {
//         const {
//             page="1",
//             limit="10",
//             search=""
//         } = req.query as {
//             page?:string,
//             limit?:string
//             search?:string
//         }
//         const response = await this.getRequestedVendors.execute(Number(limit),search,Number(page))
//         res.status(HTTP_STATUS.OK).json({
//             success:true,
//             message:"requested vendors fetched successfully",
//             vendors:response.vendors,
//             totalPages:response.total
//         })
//     }
// }
