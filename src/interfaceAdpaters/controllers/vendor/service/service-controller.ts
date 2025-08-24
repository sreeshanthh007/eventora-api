import { IServiceController } from "@entities/controllerInterfaces/vendor/service/service-controller.interface";
import { IServiceEntity } from "@entities/models/service.entity";
import { IAddServiceUseCase } from "@entities/useCaseInterfaces/vendor/service/add-service.interface.usecase";
import { Request, Response } from "express";
import { CustomRequest } from "interfaceAdpaters/middlewares/auth.middleware";
import { ServiceValidationSchema } from "interfaceAdpaters/validations/service.validation";
import { inject, injectable } from "tsyringe";







@injectable()
export class ServiceController implements IServiceController{
  constructor(
    @inject("IAddServiceUseCase") private _addServiceUseCase : IAddServiceUseCase
  ){}

  async addService(req: Request, res: Response): Promise<void> {
      
    const serviceData = req.body
    const {id} = (req as CustomRequest).user
    const validatedData =   ServiceValidationSchema.parse(serviceData)

    const mappedData :IServiceEntity  = {
      vendorId:id,
      ...validatedData,
    }

    await this._addServiceUseCase.execute(id,mappedData)
  }
}