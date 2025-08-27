import { IEventController } from "@entities/controllerInterfaces/vendor/event/event-controller.interface";
import { IEventEntity } from "@entities/models/event.entity";
import { IGetAllEventsUseCase } from "@entities/useCaseInterfaces/vendor/event/get-all-events.usecase.interface";
import { IGetEventByIdUseCase } from "@entities/useCaseInterfaces/vendor/event/get-event-by-id..usecase.interface";
import { IHostNewEventUseCase } from "@entities/useCaseInterfaces/vendor/event/host-new-event.usecase";
import { IToggleStatusUseCase } from "@entities/useCaseInterfaces/vendor/event/toggleStatus.usecase.interface";
import { IUpdateEventUseCase } from "@entities/useCaseInterfaces/vendor/event/update-event.usecase.interface";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";
import { IAddEventDTO } from "@shared/dtos/event.dto";
import { Request, Response } from "express";
import { CustomRequest } from "interfaceAdpaters/middlewares/auth.middleware";
import { inject, injectable } from "tsyringe";



@injectable()
export class EventController implements IEventController{
    constructor(
        @inject("IHostNewEventUseCase") private _addEventUseCase : IHostNewEventUseCase,
        @inject("IGetAllEventsUseCase") private _getAllEventsUseCase : IGetAllEventsUseCase,
        @inject("IToggleStatusUseCase") private _toggleStatusUseCase : IToggleStatusUseCase,
        @inject("IUpdateEventUseCase") private _updateEventUseCase : IUpdateEventUseCase,
        @inject("IGetEventsByIdUseCase") private _getEventsByIdUseCase : IGetEventByIdUseCase
    ){}
    async addEvent(req: Request, res: Response): Promise<void> {

        const eventData = req.body as IAddEventDTO
        console.log("eeven dta",eventData)
        const vendorId = (req as CustomRequest).user.id

        const roundedData : IEventEntity ={
            ...eventData,
            hostId:vendorId
        }

        await this._addEventUseCase.execute(roundedData,vendorId)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.CREATED})
    }


    async getAllEvents(req: Request, res: Response): Promise<void> {

        const {limit="6",page="1",search=""} =  
            req.query as {limit?:string,page?:string,search?:string}
    
            const response = await this._getAllEventsUseCase.execute(Number(limit),search,Number(page))

            res.status(HTTP_STATUS.OK)
            .json({success:true,message:"events fetched successfully",events:response.events,total:response.total})
    }



    async toggeleStatus(req: Request, res: Response): Promise<void> {
        
        
        const {isActive} = req.body
        const {eventId} = req.params

        if(!eventId){
            res.status(HTTP_STATUS.NOT_FOUND)
            .json({success:false,message:ERROR_MESSAGES.ID_NOT_FOUND})
        }

        await this._toggleStatusUseCase.execute(eventId,isActive)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.UPDATE_SUCCESS})
    }


    async updateEvent(req: Request, res: Response): Promise<void> {

        const {eventId} = req.params
        const data = req.body
        console.log("datat",data)
        if(!eventId){
            res.status(HTTP_STATUS.NOT_FOUND)
            .json({success:false,message:ERROR_MESSAGES.ID_NOT_FOUND})
        }

        if(!data){
            res.status(HTTP_STATUS.NOT_FOUND)
            .json({success:false,message:ERROR_MESSAGES.NOT_FOUND})
        }

        
        await this._updateEventUseCase.execute(eventId,data)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.UPDATE_SUCCESS})
    }

    async getEventById(req: Request, res: Response): Promise<void> {
        
        const {eventId} = req.params

        if(!eventId){
            res.status(HTTP_STATUS.NOT_FOUND)
            .json({success:false,message:"event id not found"})
        }

        const events = await this._getEventsByIdUseCase.execute(eventId)


        res.status(HTTP_STATUS.OK)
        .json({success:true,events})
    }
}