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
exports.EventController = void 0;
const constants_1 = require("@shared/constants");
const tsyringe_1 = require("tsyringe");
let EventController = class EventController {
    constructor(_addEventUseCase, _getAllEventsUseCase, _toggleStatusUseCase, _updateEventUseCase, _getEventsByIdUseCase) {
        this._addEventUseCase = _addEventUseCase;
        this._getAllEventsUseCase = _getAllEventsUseCase;
        this._toggleStatusUseCase = _toggleStatusUseCase;
        this._updateEventUseCase = _updateEventUseCase;
        this._getEventsByIdUseCase = _getEventsByIdUseCase;
    }
    addEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventData = req.body;
            console.log("eeven dta", eventData);
            const vendorId = req.user.id;
            const roundedData = Object.assign(Object.assign({}, eventData), { hostId: vendorId });
            yield this._addEventUseCase.execute(roundedData, vendorId);
            res.status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, message: constants_1.SUCCESS_MESSAGES.CREATED });
        });
    }
    getAllEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit = "6", page = "1", search = "" } = req.query;
            const response = yield this._getAllEventsUseCase.execute(Number(limit), search, Number(page));
            res.status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, message: "events fetched successfully", events: response.events, total: response.total });
        });
    }
    toggeleStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { eventId, isActive } = req.body;
            if (!eventId) {
                res.status(constants_1.HTTP_STATUS.NOT_FOUND)
                    .json({ success: false, message: constants_1.ERROR_MESSAGES.ID_NOT_FOUND });
            }
            yield this._toggleStatusUseCase.execute(eventId, isActive);
            res.status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, message: constants_1.SUCCESS_MESSAGES.UPDATE_SUCCESS });
        });
    }
    updateEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { eventId } = req.params;
            const data = req.body;
            console.log("datat", data);
            if (!eventId) {
                res.status(constants_1.HTTP_STATUS.NOT_FOUND)
                    .json({ success: false, message: constants_1.ERROR_MESSAGES.ID_NOT_FOUND });
            }
            if (!data) {
                res.status(constants_1.HTTP_STATUS.NOT_FOUND)
                    .json({ success: false, message: constants_1.ERROR_MESSAGES.NOT_FOUND });
            }
            yield this._updateEventUseCase.execute(eventId, data);
            res.status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, message: constants_1.SUCCESS_MESSAGES.UPDATE_SUCCESS });
        });
    }
    getEventById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { eventId } = req.params;
            if (!eventId) {
                res.status(constants_1.HTTP_STATUS.NOT_FOUND)
                    .json({ success: false, message: "event id not found" });
            }
            const events = yield this._getEventsByIdUseCase.execute(eventId);
            res.status(constants_1.HTTP_STATUS.OK)
                .json({ success: true, events });
        });
    }
};
exports.EventController = EventController;
exports.EventController = EventController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IHostNewEventUseCase")),
    __param(1, (0, tsyringe_1.inject)("IGetAllEventsUseCase")),
    __param(2, (0, tsyringe_1.inject)("IToggleStatusUseCase")),
    __param(3, (0, tsyringe_1.inject)("IUpdateEventUseCase")),
    __param(4, (0, tsyringe_1.inject)("IGetEventsByIdUseCase")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], EventController);
