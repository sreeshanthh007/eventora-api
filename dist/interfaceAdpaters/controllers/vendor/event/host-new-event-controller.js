"use strict";
// import { IHostNewEventController } from "@entities/controllerInterfaces/vendor/event/host-new-event-controller";
// import { IEventEntity } from "@entities/models/event.entity";
// import { IHostNewEventUseCase } from "@entities/useCaseInterfaces/vendor/event/host-new-event.usecase";
// import { HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";
// import { Request, Response } from "express";
// import { CustomRequest } from "interfaceAdpaters/middlewares/auth.middleware";
// import { inject, injectable } from "tsyringe";
// console.log("host new event")
// @injectable()
// export class HostNewEventController implements IHostNewEventController{
//     constructor(
//         @inject("IHostNewEventUseCase") private hostNewEventUseCase : IHostNewEventUseCase
//     ){}
//     async handle(req: Request, res: Response): Promise<void> {
//         console.log("data from backend before eventdata",req.body)
//         const eventData = req.body as Omit<IEventEntity,"hostId">
//         console.log("afterr event daata",eventData);
//         const vendorId = (req as CustomRequest).user.id
//         const roundedData : IEventEntity ={
//             ...eventData,
//             hostId:vendorId
//         }
//         await this.hostNewEventUseCase.execute(roundedData);
//         res.status(HTTP_STATUS.OK)
//         .json({success:true,message:SUCCESS_MESSAGES.CREATED})
//     }
// }
