"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCategoryListResponse = exports.toCategoryResponse = void 0;
const toCategoryResponse = (category) => {
    return {
        _id: category._id,
        categoryId: category.categoryId,
        title: category.title,
        image: category.image,
        status: category.status
    };
};
exports.toCategoryResponse = toCategoryResponse;
const toCategoryListResponse = (categories) => {
    return categories.map(exports.toCategoryResponse);
};
exports.toCategoryListResponse = toCategoryListResponse;
