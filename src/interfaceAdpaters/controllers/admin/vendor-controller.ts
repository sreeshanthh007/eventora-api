import { IVendorController } from "@entities/controllerInterfaces/admin/admin.vendor.controller.interface";
import { IApproveVendorUseCase } from "@entities/useCaseInterfaces/admin/approve-vendor.usecase";
import { IGetAllVendorsUseCase } from "@entities/useCaseInterfaces/admin/get-all-vendors.usecase";
import { IGetRequestedVendorsUseCase } from "@entities/useCaseInterfaces/admin/get-requested-vendors.usecase";
import { IHandleToggleVendorUseCase } from "@entities/useCaseInterfaces/admin/handle-toggle.vendor.usecase";
import { IRejectVendorUseCase } from "@entities/useCaseInterfaces/admin/reject-vendor.usecase";
import { IResendVerificationUseCase } from "@entities/useCaseInterfaces/admin/resend-verification.usecase";
import { CustomError } from "@entities/utils/custom.error";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "@shared/constants";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class VendorController implements IVendorController {
  constructor(
    @inject("IApproveVendorUseCase")
    private _approveVendorUseCase: IApproveVendorUseCase,
    @inject("IGetAllVendorsUseCase")
    private _getAllVendorsUseCase: IGetAllVendorsUseCase,
    @inject("IGetRequestedVendorUseCase")
    private _requestedVendorUseCase: IGetRequestedVendorsUseCase,
    @inject("IHandleToggleVendorUseCase")
    private _updateVendorAccountStatusUseCase: IHandleToggleVendorUseCase,
    @inject("IRejectVendorUseCase")
    private _rejectVendorUseCase: IRejectVendorUseCase,
    @inject("IResendVerificationUseCase") private _resendVerificationUseCase : IResendVerificationUseCase
  ) {}

  async approveVendor(req: Request, res: Response): Promise<void> {
    const vendorId = req.params.vendorId;

    if (!vendorId) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ success: false, message: ERROR_MESSAGES.ID_NOT_FOUND });
    }

    await this._approveVendorUseCase.execute(vendorId);

    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGES.UPDATE_SUCCESS });
  }

  async rejectVendor(req: Request, res: Response): Promise<void> {
    const vendorId = req.params.vendorId;
    const { rejectReason } = req.body;


    if (!vendorId) {
      throw new CustomError(ERROR_MESSAGES.ID_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    await this._rejectVendorUseCase.execute(vendorId, rejectReason);
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "rejected successfully" });
  }

  async getAllVendors(req: Request, res: Response): Promise<void> {
    const {
      limit = "10",
      page = "1",
      search = "",
    } = req.query as {
      limit?: string;
      page?: string;
      search?: string;
    };

    const response = await this._getAllVendorsUseCase.execute(
      Number(limit),
      search,
      Number(page)
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "vendors fetched successfully",
      vendors: response.user,
      totalPages: response.total,
    });
  }

  async resendVerification(req: Request, res: Response): Promise<void> {
      const vendorId = req.params.vendorId

      if(!vendorId){
        res.status(HTTP_STATUS.NOT_FOUND)
        .json({success:false,message:ERROR_MESSAGES.ID_NOT_FOUND})
      }

      await this._resendVerificationUseCase.execute(vendorId)

      res.status(HTTP_STATUS.OK)
      .json({success:true,message:"verification resend successfully"})
  }

  async getRequestedVendors(req: Request, res: Response): Promise<void> {
    const {
      page = "1",
      limit = "10",
      search = "",
    } = req.query as {
      page?: string;
      limit?: string;
      search?: string;
    };

    const response = await this._requestedVendorUseCase.execute(
      Number(limit),
      search,
      Number(page)
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "requested vendors fetched successfully",
      vendors: response.vendors,
      totalPages: response.total,
    });
  }

  async udpateVendorAccountStatus(req: Request, res: Response): Promise<void> {
    const { vendorId, status } = req.body as {
      vendorId: string;
      status: string;
    };

    if (!vendorId || !status) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "userId and status are required",
      });
      return;
    }

    if (!["active", "blocked"].includes(status)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Status must be either 'active' or 'blocked'",
      });
    }

    await this._updateVendorAccountStatusUseCase.execute(vendorId, status);

    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGES.UPDATE_SUCCESS });
    return;
  }
}
