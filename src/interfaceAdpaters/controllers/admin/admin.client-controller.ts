
import { IAdminClientController } from "@entities/controllerInterfaces/admin/client.controller.interface";
import { IGetAllUsersUseCase } from "@entities/useCaseInterfaces/admin/get-all-users.usecase";
import { IuserToggleStatusUseCase } from "@entities/useCaseInterfaces/admin/handle-user-toggle-status.usecase.interface";
import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";

@injectable()
export class AdminClientController implements IAdminClientController {
  constructor(
    @inject("IGetAllUsersUseCase")
    private _getAllClientsUseCase: IGetAllUsersUseCase,
    @inject("IUserToggleStatusUseCase")
    private _updateClientAccountStatusUseCase: IuserToggleStatusUseCase
  ) {}

  async getAllClients(req: Request, res: Response): Promise<void> {
    const {
      limit = "10",
      page = "1",
      search = "",
    } = req.query as {
      limit?: string;
      page?: string;
      search?: string;
    };

    const response = await this._getAllClientsUseCase.execute(
      Number(limit),
      search,
      Number(page)
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.USERS_FETCHED_SUCCESS,
      clients: response.user,
      totalPages: response.total,
    });
  }

  async updateClientAccountStatus(req: Request, res: Response): Promise<void> {
    const { userId, status } = req.body as { userId: string; status: string };

    if (!userId || !status) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: ERROR_MESSAGES.USER_ID_AND_STATUS_REQUIRED
      });
      return;
    }

    if (!["active", "blocked"].includes(status)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: ERROR_MESSAGES.INVALID_STATUS
      });
      return;
    }

    await this._updateClientAccountStatusUseCase.execute(userId, status);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
    });
  }
}
