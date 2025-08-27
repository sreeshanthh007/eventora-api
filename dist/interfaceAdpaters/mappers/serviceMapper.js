"use strict";
// import { IServiceEntity } from "@entities/models/service.entity";
// import { ServiceTableDTO } from "@shared/dtos/service.dto";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapServiceToTableResponse = mapServiceToTableResponse;
exports.mapServiceForEditService = mapServiceForEditService;
function mapServiceToTableResponse(service) {
    var _a;
    return {
        _id: (_a = service._id) === null || _a === void 0 ? void 0 : _a.toString(),
        serviceTitle: service.serviceTitle,
        servicePrice: service.servicePrice,
        serviceDuration: service.serviceDuration,
        status: service.status,
        serviceDescription: service.serviceDescription,
    };
}
function mapServiceForEditService(service) {
    return {
        serviceTitle: service.serviceTitle,
        additionalHourPrice: service.additionalHourPrice,
        cancellationPolicies: service.cancellationPolicies,
        serviceDescription: service.serviceDescription,
        serviceDuration: service.serviceDuration,
        servicePrice: service.servicePrice,
        termsAndConditions: service.termsAndConditions,
        yearsOfExperience: service.yearsOfExperience,
        categoryId: service.categoryId
    };
}
