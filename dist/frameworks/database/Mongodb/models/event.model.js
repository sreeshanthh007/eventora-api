"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = void 0;
const mongoose_1 = require("mongoose");
const event_schema_1 = require("../schemas/event.schema");
exports.EventModel = (0, mongoose_1.model)("Event", event_schema_1.EventSchema);
