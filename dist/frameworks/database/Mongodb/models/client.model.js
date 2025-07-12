"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModel = void 0;
const mongoose_1 = require("mongoose");
const client_schema_1 = require("../schemas/client.schema");
exports.ClientModel = (0, mongoose_1.model)("Client", client_schema_1.ClientSchema);
