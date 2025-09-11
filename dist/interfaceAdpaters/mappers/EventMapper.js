"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toClientLandingPage = void 0;
exports.mapEventEntityToTable = mapEventEntityToTable;
exports.mapEventsForEditEvent = mapEventsForEditEvent;
exports.mapEventsToLandingPage = mapEventsToLandingPage;
exports.mapEventsToEventDetailPage = mapEventsToEventDetailPage;
function mapEventEntityToTable(event) {
    var _a, _b, _c, _d, _e, _f;
    return {
        _id: (_a = event._id) === null || _a === void 0 ? void 0 : _a.toString(),
        image: event.Images[0],
        title: event.title,
        status: event.status,
        pricePerTicket: event.pricePerTicket || ((_c = (_b = event.tickets) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.pricePerTicket) || 0,
        totalTicket: event.totalTicket || ((_e = (_d = event.tickets) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.totalTickets) || 0,
        isActive: event.isActive,
        eventSchedule: ((_f = event.eventSchedule) === null || _f === void 0 ? void 0 : _f.map(schedule => ({
            date: schedule.date,
            startTime: schedule.startTime,
            endTime: schedule.endTime
        }))) || [],
    };
}
function mapEventsForEditEvent(event) {
    var _a, _b;
    return {
        title: event.title,
        description: event.description,
        eventSchedule: (_a = event.eventSchedule) === null || _a === void 0 ? void 0 : _a.map(schedule => ({
            date: schedule.date,
            startTime: schedule.startTime,
            endTime: schedule.endTime
        })),
        eventLocation: event.eventLocation,
        location: {
            type: "Point",
            coordinates: [
                event.location.coordinates[0],
                event.location.coordinates[1]
            ]
        },
        tickets: event.tickets && ((_b = event.tickets) === null || _b === void 0 ? void 0 : _b.length) > 0 ? event.tickets : [],
        pricePerTicket: event.pricePerTicket,
        totalTicket: event.totalTicket,
        images: event.Images,
        maxTicketPerUser: event.maxTicketPerUser,
        eventType: event.tickets && event.tickets.length > 0 ? "row" : "normal"
    };
}
function mapEventsToLandingPage(event) {
    var _a;
    return {
        eventId: (_a = event._id) === null || _a === void 0 ? void 0 : _a.toString(),
        title: event.title,
        eventLocation: event.eventLocation,
        pricePerTicket: event.pricePerTicket,
        attendiesCount: event.attendiesCount,
        images: event.Images[0],
        eventSchedule: event.eventSchedule.map(schedule => ({
            date: schedule.date,
            startTime: schedule.startTime,
            endTime: schedule.endTime
        }))
    };
}
const toClientLandingPage = (events) => {
    return events.map(mapEventsToLandingPage);
};
exports.toClientLandingPage = toClientLandingPage;
//  function mapEventToEventDetailsPage (event:IEventEntity) :PaginatedEventDetailsDTO{
//   return{
//     title:event.title,
//     eventLocation:event.eventLocation,
//     images:event.Images[0],
//     description:event.description,
//     attendiesCount:event.attendiesCount!,
//     pricePerTicket:event.pricePerTicket,
//     eventSchedule:event.eventSchedule.map(schedule =>({
//       date:schedule.date,
//       startTime:schedule.startTime,
//       endTime:schedule.endTime
//     })),
//     status:event.status
//   }
// }
// export const toClientEventDetailsPage =  (events:IEventEntity[]) : PaginatedEventDetailsDTO[]=>{
//   return events.map(mapEventToEventDetailsPage)
// }
function mapEventsToEventDetailPage(event) {
    var _a;
    return Object.assign({ _id: (_a = event._id) === null || _a === void 0 ? void 0 : _a.toString(), title: event.title, status: event.status, location: event.location, images: event.Images, attendiesCount: event.attendiesCount, eventLocation: event.eventLocation, description: event.description, eventSchedule: event.eventSchedule.map(s => ({
            date: s.date,
            startTime: s.startTime,
            endTime: s.endTime
        })) }, (event.tickets && event.tickets.length > 0
        ? {
            tickets: event.tickets
        }
        : {
            pricePerTicket: event.pricePerTicket,
            totalTicket: event.totalTicket,
            maxTicketPerUser: event.maxTicketPerUser
        }));
}
