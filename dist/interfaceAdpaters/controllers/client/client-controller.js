"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const constants_1 = require("@shared/constants");
const tsyringe_1 = require("tsyringe");
let ClientController = class ClientController {
    constructor(_getAllUsersDetailsUseCase, _updateProfileImageUseCase, _updatePersonalInformationUseCase, _getAllEventsForClientsUseCase, _getAllCategoryForClientsUseCase, _getEventDetailsUseCase) {
        this._getAllUsersDetailsUseCase = _getAllUsersDetailsUseCase;
        this._updateProfileImageUseCase = _updateProfileImageUseCase;
        this._updatePersonalInformationUseCase = _updatePersonalInformationUseCase;
        this._getAllEventsForClientsUseCase = _getAllEventsForClientsUseCase;
        this._getAllCategoryForClientsUseCase = _getAllCategoryForClientsUseCase;
        this._getEventDetailsUseCase = _getEventDetailsUseCase;
    }
    refreshSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, role } = req.user;
            if (!id || !role) {
                res
                    .status(constants_1.HTTP_STATUS.BAD_REQUEST)
                    .json({ success: false, message: constants_1.ERROR_MESSAGES.INVALID_TOKEN });
            }
            const user = yield this._getAllUsersDetailsUseCase.execute(id, role);
            res.status(constants_1.HTTP_STATUS.OK).json({ success: true, user: user });
        });
    }
    updateProfileImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { image } = req.body;
            const { id, role } = req.user;
            if (!id || !role) {
                res
                    .status(constants_1.HTTP_STATUS.BAD_REQUEST)
                    .json({ success: false, message: constants_1.ERROR_MESSAGES.INVALID_TOKEN });
            }
            yield this._updateProfileImageUseCase.execute(id, image, role);
            res
                .status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, message: constants_1.SUCCESS_MESSAGES.UPDATE_SUCCESS });
        });
    }
    updateProfileInformation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.user;
            const data = req.body;
            if (!id) {
                res
                    .status(constants_1.HTTP_STATUS.BAD_REQUEST)
                    .json({ success: false, message: constants_1.ERROR_MESSAGES.INVALID_TOKEN });
            }
            if (!data) {
                res
                    .status(constants_1.HTTP_STATUS.BAD_REQUEST)
                    .json({ success: false, message: constants_1.ERROR_MESSAGES.MISSING_PARAMETERS });
            }
            yield this._updatePersonalInformationUseCase.execute(id, data);
            res
                .status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, message: constants_1.SUCCESS_MESSAGES.UPDATE_SUCCESS });
        });
    }
    getAllEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const events = yield this._getAllEventsForClientsUseCase.execute();
            res
                .status(constants_1.HTTP_STATUS.OK)
                .json({
                success: true,
                message: constants_1.SUCCESS_MESSAGES.EVENT_FETCHED_SUCCESS,
                events: events,
            });
        });
    }
    getAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this._getAllCategoryForClientsUseCase.execute();
            res
                .status(constants_1.HTTP_STATUS.OK)
                .json({
                success: true,
                message: constants_1.SUCCESS_MESSAGES.CATEGORY_FETCHED_SUCCESS,
                categories: categories,
            });
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
    getEventDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { eventId } = req.params;
            if (!eventId) {
                res.status(constants_1.HTTP_STATUS.BAD_REQUEST)
                    .json({ success: false, message: constants_1.ERROR_MESSAGES.MISSING_PARAMETERS });
            }
            const event = yield this._getEventDetailsUseCase.execute(eventId);
            res.status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, message: constants_1.SUCCESS_MESSAGES.EVENT_FETCHED_SUCCESS, event });
        });
    }
};
exports.ClientController = ClientController;
exports.ClientController = ClientController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IGetAllUsersDetailsUseCase")),
    __param(1, (0, tsyringe_1.inject)("IUpdateProfileImageUseCase")),
    __param(2, (0, tsyringe_1.inject)("IUpdatePersonalInformationUseCase")),
    __param(3, (0, tsyringe_1.inject)("IGetAllEventsForClientsUseCase")),
    __param(4, (0, tsyringe_1.inject)("IGetAllCategoryForClientsUseCase")),
    __param(5, (0, tsyringe_1.inject)("IGetEventDetailsUseCase")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], ClientController);
