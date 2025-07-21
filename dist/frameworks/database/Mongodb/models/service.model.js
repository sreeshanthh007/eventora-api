"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceModel = void 0;
const mongoose_1 = require("mongoose");
const service_schema_1 = require("../schemas/service.schema");
exports.serviceModel = (0, mongoose_1.model)("service", service_schema_1.ServiceSchema);
