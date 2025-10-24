import { IVendorController } from "@entities/controllerInterfaces/vendor/vendor-controller.interface";
import { IGetAllNotificationUseCase } from "@entities/useCaseInterfaces/get-all-notification.usecase.interface";
import { IChangeVendorPasswordUseCase } from "@entities/useCaseInterfaces/vendor/change-password-vendor.usecase.interface";
import { IGetTicketDetailsUseCase } from "@entities/useCaseInterfaces/vendor/get-ticket-details.usecase.interface";
import { IGetVendorBookingUseCase } from "@entities/useCaseInterfaces/vendor/get-vendor-booking.usecase.interface";
import { IGetVendorWalletDetailsUseCase } from "@entities/useCaseInterfaces/vendor/get-vendor-wallet-details.usecase.interface";
import { IScanAndVerifyTicketsUseCase } from "@entities/useCaseInterfaces/vendor/scan-and-verify-tickets.usecase.interface";
import { IScanAndVerifyAttendiesUseCase } from "@entities/useCaseInterfaces/vendor/scan-verify-attendies.usecase.interface";
import { IUpdateVendorPersonalInformationUseCase } from "@entities/useCaseInterfaces/vendor/update-vendor-personal.usecase.interface";
import { IAddWorkSampleUseCase } from "@entities/useCaseInterfaces/vendor/worksample/add-work-sample.usecase.interface";
import { IEditWorkSampleUseCase } from "@entities/useCaseInterfaces/vendor/worksample/edit-work-sample.usecase.interface";
import { IGetworkSampleDataUseCase } from "@entities/useCaseInterfaces/vendor/worksample/get-work-sample-data.usecase";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";
import { UpdatePasswordDTO } from "@shared/dtos/user.dto";
import { Request, Response } from "express";
import { CustomRequest } from "interfaceAdpaters/middlewares/auth.middleware";
import { updateVendorProfileSchema } from "interfaceAdpaters/validations/vendor.validation";
import { editWorkSampleSchema, workSampleSchema } from "interfaceAdpaters/validations/work-sample.validation";
import { inject, injectable } from "tsyringe";



@injectable()
export class VendorController implements IVendorController{
    constructor(
        @inject("IUpdateVendorPersonalInformationUseCase") private _updateVendorPersonalInformation : IUpdateVendorPersonalInformationUseCase,
        @inject("IChangeVendorPasswordUseCase") private _changeVendorPasswordUseCase : IChangeVendorPasswordUseCase,
        @inject("IAddWorkSampleUseCase") private _addWorkSampleUseCase : IAddWorkSampleUseCase,
        @inject("IGetWorkSampleDataUseCase") private _getWorkSampleDataUseCase : IGetworkSampleDataUseCase,
        @inject("IEditWorkSampleUseCase") private _editWorkSampleUseCase : IEditWorkSampleUseCase,
        @inject("IGetAllNotificationUseCase") private _getAllNotificationUseCase  : IGetAllNotificationUseCase,
        @inject("IScanAndVerifyAttendiesUseCase") private _scanAndVerifyAttendiesUseCase : IScanAndVerifyAttendiesUseCase,
        @inject("IGetVendorWalletDetailsUseCase") private _getVendorWalletDetailsUseCase : IGetVendorWalletDetailsUseCase,
        @inject("IScanAndVerifyTicketsUseCase") private _scanAndVerifyTicketsUseCase : IScanAndVerifyTicketsUseCase,
        @inject("IGetVendorBookingsUseCase") private _getVendorBookingsUseCase :IGetVendorBookingUseCase,
        @inject("IGetTicketDetailsUseCase") private _getTicketDetailsUseCase : IGetTicketDetailsUseCase

    ){}

    async updatePersonalInformation(req: Request, res: Response): Promise<void> {
        
        const {id} = (req as CustomRequest).user

        const data = req.body

        const validatedData = updateVendorProfileSchema.parse(data)

        await this._updateVendorPersonalInformation.execute(id,validatedData)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.UPDATE_SUCCESS})

    }


    


    async changePassword(req: Request, res: Response): Promise<void> {

        const {id} = (req as CustomRequest).user

        const {currentPassword,newPassword} = req.body as UpdatePasswordDTO


        if(!currentPassword || !newPassword || !id){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS});
            return
        }

        await this._changeVendorPasswordUseCase.execute(id,currentPassword,newPassword)


        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.UPDATE_PASSWORD_SUCCESS})
    }

    
    async addWorkSample(req: Request, res: Response): Promise<void> {
        
        const {data} = req.body

        const {id} = (req as CustomRequest).user

        if(!id){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS});
            return
        }
        const validatedData = workSampleSchema.parse(data)

        await this._addWorkSampleUseCase.execute(validatedData,id)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.CREATED})
    }


    async getWorkSampleData(req: Request, res: Response): Promise<void> {
        
        const {id} = (req as CustomRequest).user


        if(!id){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
        }

        
        const response = await this._getWorkSampleDataUseCase.execute(id)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.WORK_SAMPLES_DETAILS_FETHCED_SUCCESS,data:response});
        return
    }

  
    async editWorkSample(req: Request, res: Response): Promise<void> {

        const data = req.body

        const {workSampleId} = req.params
       
        if(!data || !workSampleId){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
            return
        }


        const validatedData = editWorkSampleSchema.parse(data)


        await this._editWorkSampleUseCase.execute(validatedData,workSampleId);

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.UPDATE_SUCCESS});
    }


    async scanAndVerifyAttendies(req: Request, res: Response): Promise<void> {
        
        const {vendorId} = req.body;
  
        if(!vendorId){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS});
            return
        }


        const response = await this._scanAndVerifyAttendiesUseCase.execute(vendorId)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.TICKET_SCANNED_SUCCESS,response})
    }


    async getTicketDetails(req: Request, res: Response): Promise<void> {
        
        const {
            page="1",
            limit="6",
            search="",
            eventId
        } = req.query as {
            page:string,
            limit:string,
            search:string,
            eventId:string
        }

        const response  = await this._getTicketDetailsUseCase.execute(eventId,Number(page),Number(limit),search)

        res.status(HTTP_STATUS.OK)
        .json({succes:true,message:SUCCESS_MESSAGES.TICKET_FETCHED_SUCCESS,tickets:response.tickets,total:response.total});
    }


    async getVendorNotification(req: Request, res: Response): Promise<void> {
        
        const {id} = (req as CustomRequest).user

        if(!id){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({sccess:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
        }

        const notification = await this._getAllNotificationUseCase.execute(id)

        res.status(HTTP_STATUS.OK)
        .json({success:true,messsage:SUCCESS_MESSAGES.NOTIFICATION_FETCHED_SUCCESS,notification})
    }

    async scanAndVerifyTickets(req: Request, res: Response): Promise<void> {
        
        const {eventId, ticketId,ticketType} = req.body;
        
        if(!eventId || !ticketId){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS});
            return
        }

        await this._scanAndVerifyTicketsUseCase.execute(eventId, ticketId,ticketType)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.TICKET_VERIFIED_SUCCESS});
    }

    async getVendorwalletDetails(req: Request, res: Response): Promise<void> {
        
        const {id} = (req as CustomRequest).user

        if(!id){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
            return
        }

        const walletDetails = await this._getVendorWalletDetailsUseCase.execute(id)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.WALLET_FETCHED_SUCCESS,wallet:walletDetails})
    }


    async getBookedServices(req: Request, res: Response): Promise<void> {
        

        const{
            page="1",
            limit="6",
            search=""
        } = req.query as {
            page:string,
            limit:string
            search:string
        }

        const {id} = (req as CustomRequest).user
        const response = await this._getVendorBookingsUseCase.execute(id,Number(page),Number(limit),search);

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.VENDOR_BOOKED_SERVICES_FETCHED_SUCCESS,bookings:response.bookings,total:response.total})

    }
}