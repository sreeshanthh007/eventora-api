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
  UPDATE_PASSWORD_SUCCESS= "Password updated successfully",
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
  EVENT_BOOKING_FETCHED_SUCCESS="Event Bookings Fetched Successfully",
  WORK_SAMPLES_DETAILS_FETHCED_SUCCESS="Works Sample of vendor Fetched Successfully",
  WALLET_FETCHED_SUCCESS="Wallet details fetched successfully",
  TICKET_VERIFIED_SUCCESS="Ticket verified successfully",
  TICKET_SCANNED_SUCCESS="Ticket Scanned Successfully",
  TICKET_CANCELLED_SUCCESS="Ticket Cancelled Successfully",
  SERVICE_CANCELLED_SUCCESS="Service Cancelled Successfully",
    SERVICE_STARTED_SUCCESS="Service Started Successfully",
    SERVICE_STOPED_SUCCESS="Service Stopped Successfully",
    RATINGS_FETCHED_SUCCESS="Ratings fetched Successfully",
  RATING_ADDED_SUCCESS="Rating addedd Successfully",
  REVIEW_REMOVED_SUCCESS="Your provided review has removed successfully",
  VENDOR_BOOKED_SERVICES_FETCHED_SUCCESS='Bookings fetched Successfully',
  BOOKING_FETCHED_SUCCESS="Bookings Fetched successfully",
  TICKET_FETCHED_SUCCESS="Tickets Fetched Successfully",
  WORKFOLIO_FETCHED_SUCCESS="Workfolio Fetched Successfully",
  MARK_AS_READ_SUCCCESS="Notification marked as Read",
  NOTIFICATION_FETCHED_SUCCESS="Notification Fetched Successfully"


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
  UNEXPECTED_NULL_USER="Unexpected null user",
  FOLDER_NOT_FOUND="Folder not Found",
  CATEGORY_ALREADY_EXISTS="Category already exist",
  ID_NOT_FOUND="ID not found",
  MISSING_PARAMETERS="Some details are missing",
   USER_ID_AND_STATUS_REQUIRED="UserId and status are required",
  INVALID_STATUS="Status must be either 'active' or 'blocked",
  INVALID_EVENT_STATUS="Invalid Event Status.",
  TOKEN_BLACKLISTED="Token is Blacklisted",
  SAME_PASSWORD="New password cannot be the same as the current password",
  NOTIFICATION_NOT_FOUND="Notification not found",
  INVALID_PASSWORD="Current password is incorrect",
  OTP_EXPIRED="OTP Expired",
EVENT_BOOKING_BLOCKED_ERROR="Unable to proceed with booking as this event is currently restricted by the provider.",
  TICKET_LOCKED_ERROR="Ticket already locked by another user",
  SERVICE_SLOT_LOCKED_ERROR="Selected service slot is on Hold",
SERVICE_BOOKING_BLOCKED_ERROR="Unable to complete the booking as this service is currently restricted by the vendor.",
  SERVICE_BOOKING_ERROR="Cannot book service for past dates",
  SERVICE_STARTED_COMPLETED_ERROR="Service already started or Completed",
  SERVICE_STOP_COMPLETED_ERROR="Service is not ongoing",
  SERVICE_SLOT_BOOKING_ERROR="Cannot book a time slot that already has been passed",
  GOOGLE_GOOGLE_USER_PASSWORD_NOT_FOUND="Google user does not have a password",
  INVALID_VENDOR_SCAN_ERROR="It looks like this event isn’t associated with your account.",
  NO_VALID_TICKETS_SELECTED_ERROR="No valid tickets selected",
  TICKET_TYPE_NOT_FOUND="Ticket type not Found.",
  NOT_ENOUGH_TICKET_AVAILABLE="Not enough ticket Available.",
  WALLET_NOT_FOUND="Wallet not found",
  TICKET_NOT_FOUND="Ticket not found",
  PAYMENT_ALREADY_COMPLETED="Payment already completed",
  FAILED_PAYMENT_RETRY="Only failed payments can be Retried !",
  INVALID_TICKET_FOR_EVENT="The ticket does not belong to this event",
  INVALID_QR_CODE="Invalid QR Code",
  SLOT_CAPACITY_EXCEEDED="The selected slot has reached its maximum capacity",
  SLOT_NOT_FOUND="Slot not found",
  EVENT_NOT_FOUND="Event not found",
  INVALIID_TICKET_TYPE="Invalid Ticket Type",
  USER_ALREADY_BOOKED="You are already booked this slot one time !",
  CANNOT_CANCEL_SERVICE="This service cannot be cancelled if it is already ongoing, completed, or previously cancelled.",
  CANNOT_CANCEL_SERVICE_FAILED_PAYMENT="This service cannot be cancelled as the payment has failed.",
  CANNOT_CANCEL_TICKET="This Ticket cannot be cancelled if it is already failed",
  CANNOT_CANCEL_TICKET_USED="This Ticket cannot be cancelled as it is already used or refunded",
  WORK_SAMPLE_NOT_EXIST="Worksample of this Vendor is not provided",
  RATING_NOT_FOUND="Rating not found",
  RATING_ALREDY_ADDED="you can't add multiple Ratings",
  INVALID_RATING_EDITING="You cannot Edit Other person's Rating",
  RATING_BEFORE_BOOKING="You need to book this service before reviewing.",
  RATING_AFTER_COMPLETED="You can only review after completing the service.",
  INVALID_RATING_SUBMISSION="Unable to submit the review as no changes have been detected. Please make modifications before attempting to post again",
  CHAT_NOT_FOUND="Chat not found"
  
};



export const DIRECT_CHAT_EVENTS={
  SEND_MESSAGE:"direct-chat:send-message",
  RECEIVE_MESSAGE:"direct-chat:receive-message",
  READ_MESSAGE:"direct-chat:read-message",
  JOIN_ROOM: "direct-chat:join-room"
} as const


export const FCM_NOTIFICATION_MESSAGE={
  EVENT_BOOKING_SUCCESS:{
  title:"🎉 Your event is confirmed!",
  body:"Thanks for booking with us — we’ve received your request and will follow up shortly with all the details. Keep an eye on your gmail!",
  },
  EVENT_BOOKING_FAILED:{
  title:"🎉 Your Payment is Failed!",
  body:"We’ve received your booking request, but the payment didn’t go through. Don’t worry — Please check your My tickets to retry the Payment!",
  },
  SERVICE_BOOKING_SUCCESS: {
    title: "🎉 Service Booked Successfully!",
    body: "Thanks for choosing our service. We’ve received your booking and will get in touch shortly with the next steps."
  },
  TICKET_CANCELLATION_MESSAGE:{
    title: " Ticket Cancelled Successfully!",
    body: "The ticket has been cancelled Successfully !, check your wallet for further details"
  },
  SEND_UPCOMING_SERVICE_NOTIFICATION:{
    title:(vendorName:string)=>`Hey Be Ready ${vendorName}`,
    body:(clientName:string)=>`Only 15 minutes left to begin the service for client: ${clientName}. Get ready to take action!`

  },

  SEND_EXPIRED_SLOTS_NOTIFICATION:{
    title:"slots are expired !",
    body:"Some of your service slots have expired. Please review and update your schedule accordingly."
  }
}




export const   EVENT_STATUS_ERROR = (currentStatus:string,newStatus:string) => `cannot change from ${currentStatus} to ${newStatus}`

export const OTP_EMAIL_SUBJECT = "EVENTORA - verify your Email";

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