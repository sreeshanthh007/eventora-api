import { IGetAllUsers } from "@entities/controllerInterfaces/admin/get-all-users.interface";
import { HTTP_STATUS } from "@shared/constants";
import { getAllUsersUseCase } from "@usecases/admin/get-all-users-usecase";
import { Request, Response } from "express";

import { inject, injectable } from "tsyringe";


@injectable()
export class GetAllUserController implements IGetAllUsers {
    constructor(
        @inject("IGetAllUsersUseCase") private getAllUsers: getAllUsersUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<void> {
     
            const {
                limit = "10",
                page = "1",
                search = ""
            } = req.query as {
                limit?: string
                page?: string 
                search?: string 
            }

            const response = await this.getAllUsers.execute(
                Number(limit), 
                search, 
                Number(page) 
            );

            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: "users fetched successfully",
                clients: response.user,
                totalPages: response.total
            });
        
    }
}