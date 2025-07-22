

export const ROLES = {
    ADMIN:"admin",
    CLIENT:"client",
    VENDOR:"vendor"
} as const




export type TRole = "client" | "admin" | "vendor";

  export const HTTP_STATUS = {
      OK:200,
      CREATED:201,
      BAD_REQUEST:400,
      UNAUTHORIZED:401,
      FORBIDDEN:403,
      NOT_FOUND:404,
      CONFLICT:409,
      INTERNAL_SERVER_ERROR:500
  } as const;


 
export const SUCCESS_MESSAGES = {
    CREATED:"Created Successfully",
    LOGIN_SUCCESS:"Login Successfull.",
    REGISTERATION_SUCCESS:"Registeration completed successfully",
    OTP_SEND_SUCCESS:"OTP sent to your Email successfully",
     VERIFICATION_SUCCESS: "Verification completed successfully.",
     UPDATE_SUCCESS: "Updated successfully.",
     USER_LOGOUT_SUCCESS:"Logged out successfully"
}


export const ERROR_MESSAGES = {
NO_TOKEN:"Authentication error : No token Provided",
  TOKEN_EXPIRED: "Token Expired",
 EMAIL_NOT_FOUND: "Email Not Found",
 BLOCKED: "Your account has been blocked.",
 NOT_ALLOWED: "You are not allowed",
 EMAIL_EXISTS: "Email Already Exists",
  REQUEST_NOT_FOUND: "Request Not Found",
  INVALID_TOKEN: "Authentication error: Invalid token",
  INVALID_CREDENTIALS: "Invalid credentials provided.",
  USER_NOT_FOUND: "User not found.",
  UNAUTHORIZED_ACCESS:"Unauthorized access",
  FORBIDDEN:"Access denied. You do not have permission to access this resource.",
    SERVER_ERROR: "An error occurred, please try again later.",
      VALIDATION_ERROR: "Validation error occurred.",
        UNAUTH_NO_USER_FOUND: "Unauthorized: No user found in request",
          INVALID_ROLE: "Invalid user role",
            ROUTE_NOT_FOUND: "Route not found.",



};



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