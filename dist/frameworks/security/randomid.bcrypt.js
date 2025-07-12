"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomUUID = void 0;
const crypto_1 = require("crypto");
const generateRandomUUID = () => {
    return (0, crypto_1.randomUUID)();
};
exports.generateRandomUUID = generateRandomUUID;
