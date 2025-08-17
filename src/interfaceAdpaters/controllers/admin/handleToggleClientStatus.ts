// HandleToggleStatus.ts - Fixed version
import { IToggleUserStatus } from "@entities/controllerInterfaces/admin/handle-toggleusersStatus.interface";
import { IuserToggleStatusUseCase } from "@entities/useCaseInterfaces/admin/handle-user-toggle-status.usecase.interface";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class HandleToggleStatus implements IToggleUserStatus {
    constructor(
        @inject("IUserToggleStatusUseCase") private ToggleStatusUseCase: IuserToggleStatusUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<void> {
       
            const { userId, status } = req.body as { userId: string, status: string };
          
            
            if (!userId || !status) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: "userId and status are required"
                });
                return;
            }

          
            if (!['active', 'blocked'].includes(status)) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: "Status must be either 'active' or 'blocked'"
                });
                return;
            }

            await this.ToggleStatusUseCase.execute(userId, status);

            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.UPDATE_SUCCESS
            });
    }
}