"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAuthCookie = exports.updateCookieWithAccessToken = exports.setAuthCookies = void 0;
const setAuthCookies = (res, accessToken, refreshToken, accessTokenName, refreshTokenName) => {
    const isProduction = process.env.NODE_ENV == "production";
    res.cookie(accessTokenName, accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "strict"
    });
    res.cookie(refreshTokenName, refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "strict"
    });
};
exports.setAuthCookies = setAuthCookies;
const updateCookieWithAccessToken = (res, accessToken, accessTokenName) => {
    const isProduction = process.env.NODE_ENV == "production";
    res.cookie(accessTokenName, accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "strict"
    });
};
exports.updateCookieWithAccessToken = updateCookieWithAccessToken;
const clearAuthCookie = (res, accessTokenName, refreshTokenName) => {
    res.clearCookie(accessTokenName);
    res.clearCookie(refreshTokenName);
};
exports.clearAuthCookie = clearAuthCookie;
