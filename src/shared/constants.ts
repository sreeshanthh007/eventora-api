export const ROLES = {
  ADMIN: "admin",
  CLIENT: "client",
  VENDOR: "vendor",
} as const;

export type TRole = "client" | "admin" | "vendor";

export enum vendorStatus {
  APPROVED="approved",
  REJECTED="rejected"
}

export enum HTTP_STATUS  {
  OK= 200,
  CREATED= 201,
  BAD_REQUEST= 400,
  UNAUTHORIZED= 401,
  FORBIDDEN= 403,
  NOT_FOUND= 404,
  CONFLICT= 409,
  INTERNAL_SERVER_ERROR= 500,
};

export enum SUCCESS_MESSAGES  {
  CREATED= "Created Successfully",
  LOGIN_SUCCESS= "Login Successfull.",
  REGISTERATION_SUCCESS= "Registeration completed successfully",
  OTP_SEND_SUCCESS= "OTP sent to your Email successfully",
  VERIFICATION_SUCCESS= "Verification completed successfully.",
  UPDATE_SUCCESS= "Updated successfully.",
  USER_LOGOUT_SUCCESS= "Logged out successfully",
  CATEGORY_FETCHED_SUCCESS="Category Fetched Successfully",
  EVENT_FETCHED_SUCCESS="Events Fetched Sucessfully",
  SERVICE_FETCHED_SUCCESS="Services Fetched Successfully",
  USERS_FETCHED_SUCCESS="Clients Fetched Successfully",
  VENDOR_REJECT_SUCCESS="Rejected Successfully",
  VENDOR_FETCHED_SUCCESS="Vendors Fetched Successfully",
  VERIFICATION_RESEND_SUCCESS="Verification Resend Successfully",
  REQUESTED_VENDOR_FETCHED_SUCCESS="Requested Vendors Fetched Successfully",
  FCM_TOKEN_SAVE_SUCCESS="Token Refreshed Successfully",
  REFRESH_TOKEN_REFRESHED_SUCCESS='Refresh Token Refreshed Successfully',


};

export enum ERROR_MESSAGES  {
  NOT_FOUND="item not found",
  NO_TOKEN= "Authentication error : No token Provided",
  TOKEN_EXPIRED= "Token Expired",
  EMAIL_NOT_FOUND="Email Not Found",
  BLOCKED= "Your account has been blocked.",
  NOT_ALLOWED= "You are not allowed",
  EMAIL_EXISTS= "Email Already Exists",
  REQUEST_NOT_FOUND= "Request Not Found",
  INVALID_TOKEN= "Authentication error: Invalid token",
  INVALID_CREDENTIALS= "Invalid credentials provided.",
  USER_NOT_FOUND= "User not found.",
  UNAUTHORIZED_ACCESS= "Unauthorized access",
  FORBIDDEN=
    "Access denied. You do not have permission to access this resource.",
  SERVER_ERROR= "An error occurred, please try again later.",
  VALIDATION_ERROR= "Validation error occurred.",
  UNAUTH_NO_USER_FOUND= "Unauthorized: No user found in request",
  INVALID_ROLE= "Invalid user role",
  ROUTE_NOT_FOUND= "Route not found.",
  PAYLAOD_NOT_FOUND= "Invalid or empty Payload",
  EMAIL_REQUIRED="Email is Required",
  FOLDER_NOT_FOUND="Folder not Found",
  CATEGORY_ALREADY_EXISTS="Category already exist",
  ID_NOT_FOUND="ID not found",
  MISSING_PARAMETERS="Some details are missing",
   USER_ID_AND_STATUS_REQUIRED="UserId and status are required",
  INVALID_STATUS="Status must be either 'active' or 'blocked",
  INVALID_EVENT_STATUS="Invalid Event Status.",
  TOKEN_BLACKLISTED="Token is Blacklisted",
} ;

export const   EVENT_STATUS_ERROR = (currentStatus:string,newStatus:string) => `cannot change from ${currentStatus} to ${newStatus}`

export const VERIFICATION_MAIL_CONTENT = (otp: string) => `
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


export const GOOGLE_LOGIN_SUCCESS_MESSAGE = (name: string) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Welcome to Eventora, ${name}!</h2>
    <p>🎉 We're excited to have you on board.</p>
    <p>You've successfully signed in using your Google account.</p>
    <p>From planning events to booking the perfect vendors, <strong>Eventora</strong> is here to make every moment unforgettable.</p>
    <p style="margin-top: 20px;">If you have any questions, our support team is always here to help.</p>
    <p style="margin-top: 40px;">Cheers,<br>The Eventora Team</p>
  </div>
`;