"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRequestedVendorTableDTO = exports.toVendorResponse = void 0;
const toVendorResponse = (vendor) => {
    return {
        _id: vendor._id,
        name: vendor.name,
        email: vendor.email,
        role: vendor.role,
        phone: vendor.phone,
        place: vendor.place,
        about: vendor.about,
        vendorStatus: vendor.vendorStatus
    };
};
exports.toVendorResponse = toVendorResponse;
const toRequestedVendorTableDTO = (vendor) => {
    return {
        _id: vendor._id.toString(),
        name: vendor.name,
        email: vendor.email,
        vendorStatus: vendor.vendorStatus,
        idProof: vendor.idProof,
    };
};
exports.toRequestedVendorTableDTO = toRequestedVendorTableDTO;
