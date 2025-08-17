import { ICreateServiceController } from "@entities/controllerInterfaces/vendor/service/add-service-interface";
import { IServiceEntity } from "@entities/models/service.entity";
import { ICreateServiceUseCase } from "@entities/useCaseInterfaces/vendor/service/add-service.usecase";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";
import { Request, Response } from "express";
import { CustomRequest } from "interfaceAdpaters/middlewares/auth.middleware";
import { inject, injectable } from "tsyringe";



@injectable()
export class CreateServiceController implements ICreateServiceController{
    constructor(
        @inject("ICreateServiceUseCase") private createService : ICreateServiceUseCase
    ){}


    async handle(req: Request, res: Response): Promise<void> {
        const vendorId = (req as CustomRequest).user.id

        const servieData = req.body as IServiceEntity

        await this.createService.execute(servieData)

        res
      .status(HTTP_STATUS.CREATED)
      .json({ success: true, message: SUCCESS_MESSAGES.CREATED });
    }
}