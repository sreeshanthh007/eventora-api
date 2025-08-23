"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAddEventDTOToEntity = mapAddEventDTOToEntity;
exports.mapEventEntityToTable = mapEventEntityToTable;
function mapAddEventDTOToEntity(dto, hostId) {
    return {
        title: dto.title,
        description: dto.description,
        date: new Date(dto.date),
        startTime: dto.startTime,
        endTime: dto.endTime,
        pricePerTicket: dto.pricePerTicket,
        totalTicket: dto.totalTicket,
        ticketLimit: dto.ticketLimit,
        eventLocation: dto.eventLocation,
        coordinates: {
            type: "Point",
            coordinates: [dto.coordinates.coordinates[0], dto.coordinates.coordinates[1]],
        },
        Images: dto.Images,
        hostId,
        status: "upcoming",
        createdAt: new Date(),
        updatedAt: new Date(),
    };
}
function mapEventEntityToTable(event) {
    var _a;
    return {
        _id: (_a = event._id) === null || _a === void 0 ? void 0 : _a.toString(),
        image: event.Images[0],
        title: event.title,
        status: event.status,
        pricePerTicket: event.pricePerTicket,
        totalTicket: event.totalTicket,
        isActive: event.isActive
    };
}
