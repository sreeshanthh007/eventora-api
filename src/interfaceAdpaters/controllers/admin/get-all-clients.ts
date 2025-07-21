import { IGetAllUsers } from "@entities/controllerInterfaces/admin/get-all-users.interface";
import { HTTP_STATUS } from "@shared/constants";
import { getAllUsersUseCase } from "@usecases/admin/get-all-users-usecase";
import { Request, Response } from "express";

import { inject, injectable } from "tsyringe";


@injectable()
export class GetAllUserController implements IGetAllUsers{
    constructor(
        @inject("IGetAllUsersUseCase") private getAllUsers : getAllUsersUseCase
    ){}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const {
            limit = "10",
            currentPage = "1",
            searchTerm = ""
            } = req.query as {
            limit?: string
            currentPage?: string
            searchTerm?: string
            }


            const response = await this.getAllUsers.execute(Number(limit),searchTerm,Number(currentPage))

            res.status(HTTP_STATUS.OK).json({success:true,message:"users , fetched successfully",clients : response.user ,totalPages : response.total})
        } catch (error) {
            console.log(error)
            res.status(500).json({message:"server error"})
        }
    }
}