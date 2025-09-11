"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GOOGLE_LOGIN_SUCCESS_MESSAGE = exports.VERIFICATION_MAIL_CONTENT = exports.EVENT_STATUS_ERROR = exports.ERROR_MESSAGES = exports.SUCCESS_MESSAGES = exports.HTTP_STATUS = exports.vendorStatus = exports.ROLES = void 0;
exports.ROLES = {
    ADMIN: "admin",
    CLIENT: "client",
    VENDOR: "vendor",
};
var vendorStatus;
(function (vendorStatus) {
    vendorStatus["APPROVED"] = "approved";
    vendorStatus["REJECTED"] = "rejected";
})(vendorStatus || (exports.vendorStatus = vendorStatus = {}));
var HTTP_STATUS;
(function (HTTP_STATUS) {
    HTTP_STATUS[HTTP_STATUS["OK"] = 200] = "OK";
    HTTP_STATUS[HTTP_STATUS["CREATED"] = 201] = "CREATED";
    HTTP_STATUS[HTTP_STATUS["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HTTP_STATUS[HTTP_STATUS["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HTTP_STATUS[HTTP_STATUS["FORBIDDEN"] = 403] = "FORBIDDEN";
    HTTP_STATUS[HTTP_STATUS["NOT_FOUND"] = 404] = "NOT_FOUND";
    HTTP_STATUS[HTTP_STATUS["CONFLICT"] = 409] = "CONFLICT";
    HTTP_STATUS[HTTP_STATUS["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HTTP_STATUS || (exports.HTTP_STATUS = HTTP_STATUS = {}));
;
var SUCCESS_MESSAGES;
(function (SUCCESS_MESSAGES) {
    SUCCESS_MESSAGES["CREATED"] = "Created Successfully";
    SUCCESS_MESSAGES["LOGIN_SUCCESS"] = "Login Successfull.";
    SUCCESS_MESSAGES["REGISTERATION_SUCCESS"] = "Registeration completed successfully";
    SUCCESS_MESSAGES["OTP_SEND_SUCCESS"] = "OTP sent to your Email successfully";
    SUCCESS_MESSAGES["VERIFICATION_SUCCESS"] = "Verification completed successfully.";
    SUCCESS_MESSAGES["UPDATE_SUCCESS"] = "Updated successfully.";
    SUCCESS_MESSAGES["USER_LOGOUT_SUCCESS"] = "Logged out successfully";
    SUCCESS_MESSAGES["CATEGORY_FETCHED_SUCCESS"] = "Category Fetched Successfully";
    SUCCESS_MESSAGES["EVENT_FETCHED_SUCCESS"] = "Events Fetched Sucessfully";
    SUCCESS_MESSAGES["SERVICE_FETCHED_SUCCESS"] = "Services Fetched Successfully";
    SUCCESS_MESSAGES["USERS_FETCHED_SUCCESS"] = "Clients Fetched Successfully";
    SUCCESS_MESSAGES["VENDOR_REJECT_SUCCESS"] = "Rejected Successfully";
    SUCCESS_MESSAGES["VENDOR_FETCHED_SUCCESS"] = "Vendors Fetched Successfully";
    SUCCESS_MESSAGES["VERIFICATION_RESEND_SUCCESS"] = "Verification Resend Successfully";
    SUCCESS_MESSAGES["REQUESTED_VENDOR_FETCHED_SUCCESS"] = "Requested Vendors Fetched Successfully";
    SUCCESS_MESSAGES["FCM_TOKEN_SAVE_SUCCESS"] = "Token Refreshed Successfully";
    SUCCESS_MESSAGES["REFRESH_TOKEN_REFRESHED_SUCCESS"] = "Refresh Token Refreshed Successfully";
})(SUCCESS_MESSAGES || (exports.SUCCESS_MESSAGES = SUCCESS_MESSAGES = {}));
;
var ERROR_MESSAGES;
(function (ERROR_MESSAGES) {
    ERROR_MESSAGES["NOT_FOUND"] = "item not found";
    ERROR_MESSAGES["NO_TOKEN"] = "Authentication error : No token Provided";
    ERROR_MESSAGES["TOKEN_EXPIRED"] = "Token Expired";
    ERROR_MESSAGES["EMAIL_NOT_FOUND"] = "Email Not Found";
    ERROR_MESSAGES["BLOCKED"] = "Your account has been blocked.";
    ERROR_MESSAGES["NOT_ALLOWED"] = "You are not allowed";
    ERROR_MESSAGES["EMAIL_EXISTS"] = "Email Already Exists";
    ERROR_MESSAGES["REQUEST_NOT_FOUND"] = "Request Not Found";
    ERROR_MESSAGES["INVALID_TOKEN"] = "Authentication error: Invalid token";
    ERROR_MESSAGES["INVALID_CREDENTIALS"] = "Invalid credentials provided.";
    ERROR_MESSAGES["USER_NOT_FOUND"] = "User not found.";
    ERROR_MESSAGES["UNAUTHORIZED_ACCESS"] = "Unauthorized access";
    ERROR_MESSAGES["FORBIDDEN"] = "Access denied. You do not have permission to access this resource.";
    ERROR_MESSAGES["SERVER_ERROR"] = "An error occurred, please try again later.";
    ERROR_MESSAGES["VALIDATION_ERROR"] = "Validation error occurred.";
    ERROR_MESSAGES["UNAUTH_NO_USER_FOUND"] = "Unauthorized: No user found in request";
    ERROR_MESSAGES["INVALID_ROLE"] = "Invalid user role";
    ERROR_MESSAGES["ROUTE_NOT_FOUND"] = "Route not found.";
    ERROR_MESSAGES["PAYLAOD_NOT_FOUND"] = "Invalid or empty Payload";
    ERROR_MESSAGES["EMAIL_REQUIRED"] = "Email is Required";
    ERROR_MESSAGES["FOLDER_NOT_FOUND"] = "Folder not Found";
    ERROR_MESSAGES["CATEGORY_ALREADY_EXISTS"] = "Category already exist";
    ERROR_MESSAGES["ID_NOT_FOUND"] = "ID not found";
    ERROR_MESSAGES["MISSING_PARAMETERS"] = "Some details are missing";
    ERROR_MESSAGES["USER_ID_AND_STATUS_REQUIRED"] = "UserId and status are required";
    ERROR_MESSAGES["INVALID_STATUS"] = "Status must be either 'active' or 'blocked";
    ERROR_MESSAGES["INVALID_EVENT_STATUS"] = "Invalid Event Status.";
    ERROR_MESSAGES["TOKEN_BLACKLISTED"] = "Token is Blacklisted";
})(ERROR_MESSAGES || (exports.ERROR_MESSAGES = ERROR_MESSAGES = {}));
;
const EVENT_STATUS_ERROR = (currentStatus, newStatus) => `cannot change from ${currentStatus} to ${newStatus}`;
exports.EVENT_STATUS_ERROR = EVENT_STATUS_ERROR;
const VERIFICATION_MAIL_CONTENT = (otp) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2 style="color: #0a74da;">Welcome to Eventora!</h2>
    <p>Dear user,</p>
    <p>Thank you for signing up with <strong>Eventora</strong>. We’re excited to have you on board! To complete your registration, please verify your email address using the OTP code provided below:</p>
    <div style="text-align: center; margin: 20px 0;">
      <span style="font-size: 24px; font-weight: bold; background-color: #f2f2f2; padding: 10px; border-radius: 5px;">${otp}</span>
    </div>
    <p>With Eventora, you can explore, organize, and attend amazing events seamlessly.</p>
    <p>If you didn’t request this, please ignore this email or reach out to our support team.</p>
    <p>We can't wait to help you create and discover unforgettable moments!</p>
    <p>Best regards,<br/>The Eventora Team</p>
    <hr style="border: none; border-top: 1px solid #ccc;" />
    <p style="font-size: 12px; color: #777;">This email was sent from an unmonitored account. Please do not reply to this email.</p>
  </div>
`;
exports.VERIFICATION_MAIL_CONTENT = VERIFICATION_MAIL_CONTENT;
const GOOGLE_LOGIN_SUCCESS_MESSAGE = (name) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Welcome to Eventora, ${name}!</h2>
    <p>🎉 We're excited to have you on board.</p>
    <p>You've successfully signed in using your Google account.</p>
    <p>From planning events to booking the perfect vendors, <strong>Eventora</strong> is here to make every moment unforgettable.</p>
    <p style="margin-top: 20px;">If you have any questions, our support team is always here to help.</p>
    <p style="margin-top: 40px;">Cheers,<br>The Eventora Team</p>
  </div>
`;
exports.GOOGLE_LOGIN_SUCCESS_MESSAGE = GOOGLE_LOGIN_SUCCESS_MESSAGE;
