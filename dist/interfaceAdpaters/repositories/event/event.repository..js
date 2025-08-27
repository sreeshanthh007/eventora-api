"use strict";
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
exports.EventRepository = void 0;
const event_model_1 = require("@frameworks/database/Mongodb/models/event.model");
class EventRepository {
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield event_model_1.EventModel.create(data);
        });
    }
    findEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield event_model_1.EventModel.find({ isActive: true });
        });
    }
    findPaginatedEvents(filter, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const [events, total] = yield Promise.all([
                yield event_model_1.EventModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
                yield event_model_1.EventModel.countDocuments(filter)
            ]);
            return { events, total };
        });
    }
    findById(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield event_model_1.EventModel.findById(eventId);
        });
    }
    findByIdAndToggleStatus(evendId, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            yield event_model_1.EventModel.findByIdAndUpdate(evendId, { isActive }, { new: true });
        });
    }
    updateEvent(eventId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield event_model_1.EventModel.findByIdAndUpdate(eventId, { $set: updateData }, { new: true });
        });
    }
}
exports.EventRepository = EventRepository;
