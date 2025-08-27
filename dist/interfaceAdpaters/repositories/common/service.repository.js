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
exports.ServiceRepository = void 0;
const service_model_1 = require("@frameworks/database/Mongodb/models/service.model");
class ServiceRepository {
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield service_model_1.serviceModel.create(data);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield service_model_1.serviceModel.findById(id);
        });
    }
    findByIdAndUpdate(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield service_model_1.serviceModel.findByIdAndUpdate(id, data, {
                new: true
            });
        });
    }
    findByIdAndUpdateStatus(serviceId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield service_model_1.serviceModel.findByIdAndUpdate(serviceId, { $set: { status: status } }, { new: true });
        });
    }
    getAllServices(filter, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const [services, total] = yield Promise.all([
                service_model_1.serviceModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
                service_model_1.serviceModel.countDocuments(filter)
            ]);
            return {
                services,
                total
            };
        });
    }
}
exports.ServiceRepository = ServiceRepository;
