import { IServiceController } from "@entities/controllerInterfaces/vendor/service/service-controller.interface";
import { IServiceEntity } from "@entities/models/service.entity";
import { IAddServiceUseCase } from "@entities/useCaseInterfaces/vendor/service/add-service.interface.usecase";
import { IEditServiceUseCase } from "@entities/useCaseInterfaces/vendor/service/edit-service.interface.usecase";
import { IGetAllServiceUseCase } from "@entities/useCaseInterfaces/vendor/service/get-all-service.interface.usecase";
import { IGetServiceByIdUseCase } from "@entities/useCaseInterfaces/vendor/service/get-service-by-id.interface.usecase";
import { IToggleServiceStatusUseCase } from "@entities/useCaseInterfaces/vendor/service/toggle-service.interface.usecase";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "@shared/constants";
import { Request, Response } from "express";
import { CustomRequest } from "interfaceAdpaters/middlewares/auth.middleware";
import {
  EditServiceValidationSchema,
  ServiceValidationSchema,
} from "interfaceAdpaters/validations/service.validation";
import { inject, injectable } from "tsyringe";


@injectable()
export class ServiceController implements IServiceController {
  constructor(
    @inject("IAddServiceUseCase")
    private _addServiceUseCase: IAddServiceUseCase,
    @inject("IEditServiceUseCase")
    private _editServiceUseCase: IEditServiceUseCase,
    @inject("IGetAllServiceUsecase")
    private _getServiceUseCase: IGetAllServiceUseCase,
    @inject("IGetServiceByIdUseCase")
    private _getServiceByIdUseCase: IGetServiceByIdUseCase,
    @inject("IToggleServiceStatusUseCase")
    private _toggleServiceUseCase: IToggleServiceStatusUseCase
  ) {}

  async addService(req: Request, res: Response): Promise<void> {
    const serviceData = req.body;
    const { id } = (req as CustomRequest).user;
    const validatedData = ServiceValidationSchema.parse(serviceData);

    const mappedData: IServiceEntity = {
      vendorId: id,
      ...validatedData,
    };

    await this._addServiceUseCase.execute(id, mappedData);

    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGES.CREATED });
  }

  async editService(req: Request, res: Response): Promise<void> {
    const { id } = (req as CustomRequest).user;
    const data = req.body;
    const { serviceId } = req.params;

    const validatedData = EditServiceValidationSchema.parse(data);

    await this._editServiceUseCase.execute(id, serviceId, validatedData);

    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGES.UPDATE_SUCCESS });
  }

  async getAllService(req: Request, res: Response): Promise<void> {
    const {
      page = "1",
      limit = "2",
      search = "",
    } = req.query as {
      page?: string;
      limit?: string;
      search?: string;
    };

    const response = await this._getServiceUseCase.execute(
      Number(limit),
      search,
      Number(page)
    );

    res
      .status(HTTP_STATUS.OK)
      .json({
        success: true,
        message: SUCCESS_MESSAGES.SERVICE_FETCHED_SUCCESS,
        services: response.services,
        total: response.total,
      });
  }

  async getServiceById(req: Request, res: Response): Promise<void> {
    const { serviceId } = req.params;

    if (!serviceId) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ success: false, message: ERROR_MESSAGES.MISSING_PARAMETERS});
    }

    const service = await this._getServiceByIdUseCase.execute(serviceId);

    res.status(HTTP_STATUS.OK).json({ success: true, service });
  }

  async toggleServiceStatus(req: Request, res: Response): Promise<void> {
    const { serviceId } = req.params;
    const { status } = req.body;
    const { id } = (req as CustomRequest).user;

    if (!serviceId || !id) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ success: false, message: ERROR_MESSAGES.MISSING_PARAMETERS });
    }

    if (!["active", "blocked"].includes(status)) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ success: false, message: ERROR_MESSAGES.MISSING_PARAMETERS });
    }

    await this._toggleServiceUseCase.execute(serviceId);

    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGES.UPDATE_SUCCESS });
  }
}
