import { IClientController } from "@entities/controllerInterfaces/client/client-controller.interface";
import { IGetAllCategoryForClientsUseCase } from "@entities/useCaseInterfaces/client/category/get-all-category-clients.usecase.interface";
import { IGetAllEventsWithFilterUseCase } from "@entities/useCaseInterfaces/client/event/get-all-events-with-filters.usercase.interface";
import { IGetAllEventsForClientsUseCase } from "@entities/useCaseInterfaces/client/event/get-all-events-clients.usecase.interface";
import { IGetEventDetailsUseCase } from "@entities/useCaseInterfaces/client/event/get-event-details-clients.interface.usecase";
import { IUpdatePersonalInformationUseCase } from "@entities/useCaseInterfaces/client/update-personal-information.interface.usecase";
import { IUpdateProfileImageUseCase } from "@entities/useCaseInterfaces/client/updateProfileImage.usecase.interface";
import { IGetAllUsersDetailsUseCase } from "@entities/useCaseInterfaces/get-all-users.interface.usecase";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
  TRole,
} from "@shared/constants";
import { Request, Response } from "express";
import { CustomRequest } from "@middlewares/auth.middleware";
import { inject, injectable } from "tsyringe";
import { IGetAllServiceWithFilterUseCase } from "@entities/useCaseInterfaces/client/service/get-all-service-with-filter.usecase.interface";
import { IGetAllServiceDetailsUseCase } from "@entities/useCaseInterfaces/client/service/get-service-details.usecase.interface";
import { UpdateClientDTO, UpdatePasswordDTO } from "@shared/dtos/user.dto";
import { IClientGetEventBookingUseCase } from "@entities/useCaseInterfaces/client/event/client-get-event-booking.usecase.interface";
import { IChangeClientPasswordUseCase } from "@entities/useCaseInterfaces/client/change-password-client-usecase.interface";
import { IGetCategoryForFilterUseCase } from "@entities/useCaseInterfaces/client/category/get-category-for-filter.usecase.interface";
import { IGetServicesProvidedByVendorsUseCase } from "@entities/useCaseInterfaces/client/service/get-services-provided-vendors.usecase.interface";
import { IGetClientWalletDetailsUseCase } from "@entities/useCaseInterfaces/client/get-client-wallet-details.usecase.interface";
import { ServiceBookingCreationDTO } from "@shared/dtos/service-booking-dto";
import { ICreateServiceBookingUseCase } from "@entities/useCaseInterfaces/client/service/create-service-booking-usercase.interface";
import { ICancelTicketUseCase } from "@entities/useCaseInterfaces/client/event/cancel-ticket.usecase.interface";
import { IGetVendorWorkFolioUseCase } from "@entities/useCaseInterfaces/client/get-workfolio-of-vendor.usecase.interface";
import { IGetAllNotificationUseCase } from "@entities/useCaseInterfaces/get-all-notification.usecase.interface";
import { IGetClientBookedServicesUseCase } from "@entities/useCaseInterfaces/client/service/client-get-booked-service.usecase.interface";
import { IMarkAsReadNotificationUseCase } from "@entities/useCaseInterfaces/client/mark-as-read-notification.usecase.interface";
import { ICancelServiceUseCase } from "@entities/useCaseInterfaces/client/service/cancel-service.usecase.interface";
import { IRetryEventPaymentUseCase } from "@entities/useCaseInterfaces/client/event/retry-event-payment.usecase.interface";


@injectable()
export class ClientController implements IClientController {
  constructor(
    @inject("IGetAllUsersDetailsUseCase")
    private _getAllUsersDetailsUseCase: IGetAllUsersDetailsUseCase,
    @inject("IUpdateProfileImageUseCase")
    private _updateProfileImageUseCase: IUpdateProfileImageUseCase,
    @inject("IUpdatePersonalInformationUseCase")
    private _updatePersonalInformationUseCase: IUpdatePersonalInformationUseCase,
    @inject("IGetAllEventsForClientsUseCase")
    private _getAllEventsForClientsUseCase: IGetAllEventsForClientsUseCase,
    @inject("IGetAllCategoryForClientsUseCase")
    private _getAllCategoryForClientsUseCase: IGetAllCategoryForClientsUseCase,
    @inject("IGetAllEventsWithFilterUseCase") 
    private _getAllEventsWIthFiltersUseCase : IGetAllEventsWithFilterUseCase,
    @inject("IGetEventDetailsUseCase")
    private _getEventDetailsUseCase : IGetEventDetailsUseCase,
    @inject("IGetAllServiceForClientUseCase")
    private _getAllServiceForCLientUseCase : IGetAllServiceWithFilterUseCase,
    @inject("IGetServicesProvidedByVendorsUseCase")
    private _getServicesProvidedByVendorsUseCase : IGetServicesProvidedByVendorsUseCase,
    @inject("IGetServiceDetailsUseCase")
    private _getServiceDetailsUseCase : IGetAllServiceDetailsUseCase,
    @inject("IGetCategoriesForFilterUseCase")
    private _getCategoryForfilterUseCase : IGetCategoryForFilterUseCase,
    @inject("IClientGetEventBookingUseCase")
    private _clientGetEventBookingUseCase : IClientGetEventBookingUseCase,
    @inject("IGetClientBookedServiceUseCase") 
    private _getBookedServiceUseCase : IGetClientBookedServicesUseCase,
    @inject("IChangeClientPasswordClientUseCase")
    private _changeClientPasswordUseCase : IChangeClientPasswordUseCase,
    @inject("IGetClientWalletDetailsUseCase")
    private _getClientWalletDetailsUseCase : IGetClientWalletDetailsUseCase,
    @inject("ICreateServiceBookingUseCase")
    private _createServiceBookingUseCase : ICreateServiceBookingUseCase,
    @inject("ICancelTicketUseCase") 
    private _cancelTicketUseCase : ICancelTicketUseCase,
    @inject("ICancelServiceUseCase")
    private _cancelServiceUseCase : ICancelServiceUseCase,
    @inject("IRetryEventPaymentUseCase")
    private _retryEventPaymentUseCase : IRetryEventPaymentUseCase,
    @inject("IGetAllNotificationUseCase")
    private _getAllNotificationUseCase : IGetAllNotificationUseCase,
    @inject("IMarkAsReadNotificationUseCase")
    private _markAsReadNotificationUseCase : IMarkAsReadNotificationUseCase,
    @inject("IGetWorkFolioforClientUseCase")
     private  _getWorkfolioOfVendorUseCase : IGetVendorWorkFolioUseCase
  ) {}





  async refreshSession(req: Request, res: Response): Promise<void> {
    const { id, role } = (req as CustomRequest).user;

    if (!id || !role) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ success: false, message: ERROR_MESSAGES.INVALID_TOKEN });
    }

    const user = await this._getAllUsersDetailsUseCase.execute(
      id,
      role as TRole
    );

    res.status(HTTP_STATUS.OK).json({ success: true, user: user });
  }




  async updateProfileImage(req: Request, res: Response): Promise<void> {
    const { image } = req.body;

    const { id, role } = (req as CustomRequest).user;

    if (!id || !role) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ success: false, message: ERROR_MESSAGES.INVALID_TOKEN });
    }

    await this._updateProfileImageUseCase.execute(id, image, role as TRole);

    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGES.UPDATE_SUCCESS });
  }




  
  async updateProfileInformation(req: Request, res: Response): Promise<void> {
    const { id } = (req as CustomRequest).user;
    const data = req.body as UpdateClientDTO

    if (!id) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ success: false, message: ERROR_MESSAGES.INVALID_TOKEN });
    }

    if (!data) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ success: false, message: ERROR_MESSAGES.MISSING_PARAMETERS });
    }

    await this._updatePersonalInformationUseCase.execute(id, data);

    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGES.UPDATE_SUCCESS });
  }




 async changePassword(req: Request, res: Response): Promise<void> {

      const { id } = (req as CustomRequest).user;

    const {currentPassword,newPassword} = req.body as UpdatePasswordDTO

    if(!id || !currentPassword || !newPassword){

      res.status(HTTP_STATUS.BAD_REQUEST)

      .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
    }


    await this._changeClientPasswordUseCase.execute(id,currentPassword,newPassword)

    res.status(HTTP_STATUS.OK)
    .json({success:true,message:SUCCESS_MESSAGES.UPDATE_PASSWORD_SUCCESS})
 }








  async getAllEvents(req: Request, res: Response): Promise<void> {
    const events = await this._getAllEventsForClientsUseCase.execute();

    res
      .status(HTTP_STATUS.OK)
      .json({
        success: true,
        message: SUCCESS_MESSAGES.EVENT_FETCHED_SUCCESS,
        events: events,
      });
  }







  async getAllCategories(req: Request, res: Response): Promise<void> {
    const categories = await this._getAllCategoryForClientsUseCase.execute();

    res
      .status(HTTP_STATUS.OK)
      .json({
        success: true,
        message: SUCCESS_MESSAGES.CATEGORY_FETCHED_SUCCESS,
        categories: categories,
      });
  }




  async  getCategoriesForFilter(req: Request, res: Response): Promise<void> {
      

    const categories = await this._getCategoryForfilterUseCase.execute()

    res.status(HTTP_STATUS.OK)
    .json({success:true,message:SUCCESS_MESSAGES.CATEGORY_FETCHED_SUCCESS,categories});
  }




  async getAllEventsWithFilters(req: Request, res: Response): Promise<void> {
      
      const {page="1",limit="6",search="",location="",sort="date-asc",lat,lng} = 
      req.query as unknown as {
        page:number,
        limit:number,
        search?:string,
        location?:string,
        sort:string,
        lat?:string,
        lng?:string
      };

      const response = await this._getAllEventsWIthFiltersUseCase.execute({
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        search: search as string,
        location: location as string,
        sort: sort as string,
        lat: lat ? parseFloat(lat as string) : undefined,
        lng: lng ? parseFloat(lng as string) : undefined
    });

    res.status(HTTP_STATUS.OK)
    .json({success:true,message:SUCCESS_MESSAGES.EVENT_FETCHED_SUCCESS,events:response.events,total:response.total})
      
  }





  async getEventDetails(req: Request, res: Response): Promise<void> {
      
      const {eventId} = req.params

      if(!eventId){
        res.status(HTTP_STATUS.BAD_REQUEST)
        .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
      }
      
      const event = await this._getEventDetailsUseCase.execute(eventId)

      res.status(HTTP_STATUS.OK)
      .json({success:true,message:SUCCESS_MESSAGES.EVENT_FETCHED_SUCCESS,event})
  }





  async getAllServiceWithFilters(req: Request, res: Response): Promise<void> {
      
      const {page="1",limit="6",search="",sort="date-asc",categoryId} = req.query as unknown as {
        page:number,
        limit:number,
        search:string,
        sort:string,
        categoryId:string
      }

      const response = await this._getAllServiceForCLientUseCase.execute({
        page:Number(page),
        limit:Number(limit),
        search:search,
        sort:sort,
        categoryId
      });


      res.status(HTTP_STATUS.OK)
      .json({success:true,message:SUCCESS_MESSAGES.SERVICE_FETCHED_SUCCESS,services:response.services,total:response.total})

  }





  async getServiceDetails(req: Request, res: Response): Promise<void> {
  
      const {serviceId} = req.params

      if(!serviceId){
        res.status(HTTP_STATUS.BAD_REQUEST)
        .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
      }


      const response = await this._getServiceDetailsUseCase.execute(serviceId)

      res.status(HTTP_STATUS.OK)
      .json({success:true,message:SUCCESS_MESSAGES.SERVICE_FETCHED_SUCCESS,service:response})
  }





  async bookService(req: Request, res: Response): Promise<void> {
  
      const {serviceId,bookingData,amount,currency,vendorId} : ServiceBookingCreationDTO =  req.body
    console.log("items in booke service",serviceId,bookingData,amount,currency,vendorId);
      const {id} = (req as CustomRequest).user
 
      if(!id){
        res.status(HTTP_STATUS.BAD_REQUEST)
        .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS});
        return
      }

      const paymentIntent = await this._createServiceBookingUseCase.execute(
        "service",
        id,
        vendorId,
        serviceId,
        bookingData,
        amount,
        currency
      );

      res.status(HTTP_STATUS.OK)
      .json({success:true,clientSecret:paymentIntent.client_secret});


  }





  async getServicesProvidedByVendors(req: Request, res: Response): Promise<void> {

      const {id} = (req as CustomRequest).user
      const {vendorId} = req.params

      if(!id || !vendorId){
        res.status(HTTP_STATUS.NOT_FOUND)
        .json({success:false,message:ERROR_MESSAGES.USER_NOT_FOUND})
      }

      const services = await this._getServicesProvidedByVendorsUseCase.execute(vendorId)

      res.status(HTTP_STATUS.OK)
      .json({success:true,message:SUCCESS_MESSAGES.SERVICE_FETCHED_SUCCESS,services})

  }





  async getEventBooking(req: Request, res: Response): Promise<void> {

    const {
            page = "1",
            limit = "6",
            search=""
        }  = req.query as {
            page?:string,
            limit?:string,
            search?:string
        }


        const { id } = (req as CustomRequest).user;

        const response = await this._clientGetEventBookingUseCase.execute(
          id,
          Number(page),
          Number(limit),
          search
        );

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.EVENT_BOOKING_FETCHED_SUCCESS,bookedEvents:response.bookedEvents,total:response.total})
 
  }



  async getBookedServices(req: Request, res: Response): Promise<void> {
      
    const {id} = (req as CustomRequest).user

        const {
          page="1",
          limit="6",
          search=""
        } = req.query as {
          page:string,
          limit:string
          search:string
        }


    if(!id || !page || !limit){
      res.status(HTTP_STATUS.BAD_REQUEST)
      .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
    }

    const response = await this._getBookedServiceUseCase.execute(id,Number(page),Number(limit),search)

    res.status(HTTP_STATUS.OK)
    .json({success:true,message:SUCCESS_MESSAGES.SERVICE_FETCHED_SUCCESS,bookings:response.bookings,total:response.total})

  }



  async getClientWalletDetails(req: Request, res: Response): Promise<void> {
      
      const {id} = (req as CustomRequest).user
      const {
        page="1",
        limit="6",
        type="all"
      } = req.query as {
        page:string
        limit:string
        type:string
      }

      if(!id){
        res.status(HTTP_STATUS.BAD_REQUEST)
        .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
      }
  
      const response = await this._getClientWalletDetailsUseCase.execute(id,type,Number(page),Number(limit))
 
      res.status(HTTP_STATUS.OK)
      .json({success:true,message:SUCCESS_MESSAGES.WALLET_FETCHED_SUCCESS,wallet:response})
  }





  async cancelTickets(req: Request, res: Response): Promise<void> {
      
      const {ticketId,eventId} = req.params
  
      const {id} = (req as CustomRequest).user

      if(!ticketId){
        res.status(HTTP_STATUS.BAD_REQUEST)
        .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
      }

      await this._cancelTicketUseCase.execute(ticketId,id,eventId)

      res.status(HTTP_STATUS.OK)
      .json({success:true,message:SUCCESS_MESSAGES.TICKET_CANCELLED_SUCCESS})
  }



  async cancelService(req: Request, res: Response): Promise<void> {
      
    const {id} = (req as CustomRequest).user

    const {vendorId,serviceId,bookingId} = req.params

    if(!id || !vendorId  || !serviceId || !bookingId){
      res.status(HTTP_STATUS.BAD_REQUEST)
      .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
    }


    await this._cancelServiceUseCase.execute(id,vendorId,serviceId,bookingId)

    res.status(HTTP_STATUS.OK)
    .json({success:true,message:SUCCESS_MESSAGES.SERVICE_CANCELLED_SUCCESS})
  }


  async retryPaymentForTicket(req: Request, res: Response): Promise<void> {
      
    const {ticketId} = req.params

    if(!ticketId){
      res.status(HTTP_STATUS.BAD_REQUEST)
      .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
    }

    const paymentIntent = await this._retryEventPaymentUseCase.execute(ticketId)

    res.status(HTTP_STATUS.OK)
    .json({success:true,clientSecret:paymentIntent.client_secret})

  }

  async getAllNotifications(req: Request, res: Response): Promise<void> {
      const {id} = (req as CustomRequest).user

      if(!id){
        res.status(HTTP_STATUS.BAD_REQUEST)
        .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
      }

      const notification = await this._getAllNotificationUseCase.execute(id)

      res.status(HTTP_STATUS.OK)
      .json({success:true,message:SUCCESS_MESSAGES.NOTIFICATION_FETCHED_SUCCESS,notification})
  }



  async markAsReadNotifications(req: Request, res: Response): Promise<void> {
      
      const {id} = (req as CustomRequest).user
    
      const {notificationId} = req.params

      if(!id || !notificationId){
        res.status(HTTP_STATUS.BAD_REQUEST)
        .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
      }

      await this._markAsReadNotificationUseCase.execute(id,notificationId);

      res.status(HTTP_STATUS.OK)
      .json({success:true,message:SUCCESS_MESSAGES.MARK_AS_READ_SUCCCESS})
  }



  async getVendorWorkfolioForClient(req: Request, res: Response): Promise<void> {
      
      const {vendorId} = req.params

      if(!vendorId){
        res.status(HTTP_STATUS.BAD_REQUEST)
        .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
      }

      const worksample = await this._getWorkfolioOfVendorUseCase.execute(vendorId)

      res.status(HTTP_STATUS.OK)
      .json({success:true,message:SUCCESS_MESSAGES.WORKFOLIO_FETCHED_SUCCESS,worksample});

  }
}



