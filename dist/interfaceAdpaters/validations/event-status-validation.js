"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEventStatus = void 0;
const custom_error_1 = require("@entities/utils/custom.error");
const constants_1 = require("@shared/constants");
const validateEventStatus = (currentStatus, newStatus) => {
    const allowedTransitions = {
        upcoming: ["upcoming", "cancelled", "ongoing", "completed"],
        cancelled: ["cancelled"],
        ongoing: ["ongoing", "completed"],
        completed: ["completed"]
    };
    const allowed = allowedTransitions[currentStatus];
    if (!allowed.includes(newStatus)) {
        throw new custom_error_1.CustomError((0, constants_1.EVENT_STATUS_ERROR)(currentStatus, newStatus), constants_1.HTTP_STATUS.BAD_REQUEST);
    }
};
exports.validateEventStatus = validateEventStatus;
