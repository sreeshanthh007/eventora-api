import { IClientController } from "@entities/controllerInterfaces/client/client-controller.interface";
import { IGetAllCategoryForClientsUseCase } from "@entities/useCaseInterfaces/client/get-all-category.usecase";
// import { IGetAllEventsWithFilterUseCase } from "@entities/useCaseInterfaces/client/get-all-events-with-filters.usercase.interface";
// // import { IGetAllEventsWithFilterUseCase } from "@entities/useCaseInterfaces/client/get-all-events-with-filters.usercase.interface";
import { IGetAllEventsForClientsUseCase } from "@entities/useCaseInterfaces/client/get-all-events.usecase.interface";
import { IGetEventDetailsUseCase } from "@entities/useCaseInterfaces/client/get-event-details.interface.usecase";
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
import { CustomRequest } from "interfaceAdpaters/middlewares/auth.middleware";
import { inject, injectable } from "tsyringe";

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
    // @inject("IGetAllEventsWithFilterUseCase") 
    // private _getAllEventsWIthFiltersUseCase : IGetAllEventsWithFilterUseCase,
    @inject("IGetEventDetailsUseCase")
    private _getEventDetailsUseCase : IGetEventDetailsUseCase
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
    const data = req.body;

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

  // async getAllEventsWithFilters(req: Request, res: Response): Promise<void> {
  //   const {
  //     page = "1",
  //     limit = "6",
  //     search = "",
  //     location = "",
  //     sort = "",
  //     lat,
  //     lng
  //   } = req.query as {
  //     page: string;
  //     limit: string;
  //     search?: string;
  //     location?: string;
  //     sort?: string;
  //     lat?:string,
  //     lng?:string
  //   };

  //   const response = await this._getAllEventsWIthFiltersUseCase.execute({
  //     page:Number(page),
  //     limit:Number(limit),
  //     lat: lat ? parseFloat(lat) : undefined,
  //     lng: lng ? parseFloat(lng) : undefined,
  //     location:location,
  //     search:search,
  //     sort:sort
  //   });


  //   res.status(HTTP_STATUS.OK)
  //   .json({success:true,message:SUCCESS_MESSAGES.EVENT_FETCHED_SUCCESS,events:response.events,total:response.total})

  // }


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
}
