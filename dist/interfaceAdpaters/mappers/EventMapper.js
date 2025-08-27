"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toClientLandingPage = void 0;
exports.mapAddEventDTOToEntity = mapAddEventDTOToEntity;
exports.mapEventEntityToTable = mapEventEntityToTable;
exports.mapEventsForEditEvent = mapEventsForEditEvent;
exports.mapEventsToLandingPage = mapEventsToLandingPage;
function mapAddEventDTOToEntity(dto, hostId) {
    return {
        title: dto.title,
        description: dto.description,
        date: new Date(dto.date),
        startTime: dto.startTime,
        endTime: dto.endTime,
        pricePerTicket: dto.pricePerTicket,
        totalTicket: dto.totalTicket,
        eventLocation: dto.eventLocation,
        location: {
            type: "Point",
            coordinates: [dto.location.coordinates[0], dto.location.coordinates[1]],
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
        isActive: event.isActive,
        startTime: event.startTime,
        endTime: event.endTime,
        date: event.date
    };
}
function mapEventsForEditEvent(event) {
    return {
        title: event.title,
        description: event.description,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
        eventLocation: event.eventLocation,
        location: {
            type: "Point",
            coordinates: [
                event.location.coordinates[0],
                event.location.coordinates[1]
            ]
        },
        pricePerTicket: event.pricePerTicket,
        totalTicket: event.totalTicket,
        images: event.Images
    };
}
function mapEventsToLandingPage(event) {
    return {
        title: event.title,
        date: event.date,
        eventLocation: event.eventLocation,
        pricePerTicket: event.pricePerTicket,
        images: event.Images[0]
    };
}
const toClientLandingPage = (events) => {
    return events.map(mapEventsToLandingPage);
};
exports.toClientLandingPage = toClientLandingPage;
