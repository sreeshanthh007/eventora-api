"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseRegistry = void 0;
const tsyringe_1 = require("tsyringe");
const OTP_bcrypt_1 = require("@frameworks/security/OTP.bcrypt.");
const password_bcrypt_1 = require("@frameworks/security/password.bcrypt");
const client_login_strategy_1 = require("@usecases/auth/login-strategies/client-login-strategy");
const client_google_login_strategy_1 = require("@usecases/auth/login-strategies/client-google-login.strategy");
const vendor_google_login_strategy_1 = require("@usecases/auth/login-strategies/vendor-google-login.strategy");
const client_register_strategy_1 = require("@usecases/auth/register-strategies/client-register-strategy");
const vendor_register_strategy_1 = require("@usecases/auth/register-strategies/vendor-register-strategy");
const vendor_login_strategy_1 = require("@usecases/auth/login-strategies/vendor-login-strategy");
const admin_login_strategy_1 = require("@usecases/auth/login-strategies/admin-login-strategy");
const jwtService_1 = require("interfaceAdpaters/services/jwtService");
const emailServices_1 = require("interfaceAdpaters/services/emailServices");
const user_existService_1 = require("interfaceAdpaters/services/user-existService");
const clientExist_service_1 = require("interfaceAdpaters/services/client/clientExist-service");
const sent_forgot_password_otp_usecase_1 = require("@usecases/auth/sent-forgot.password-otp.usecase");
const register_user_usecase_1 = require("@usecases/auth/register-user.usecase");
const login_user_usecase_1 = require("@usecases/auth/login-user.usecase");
const send_email_usecase_1 = require("@usecases/auth/send-email.usecase");
const verify_otp_usecase_1 = require("@usecases/auth/verify-otp.usecase");
const generate_token_usecase_1 = require("@usecases/auth/generate-token.usecase");
const refresh_token_usecase_1 = require("@usecases/auth/refresh-token.usecase");
const clientUpdatePasswordSUseCase_1 = require("@usecases/auth/update-password/clientUpdatePasswordSUseCase");
const winston_logger_adapter_1 = require("interfaceAdpaters/services/logger/winston-logger-adapter");
const logger_middleware_1 = require("interfaceAdpaters/middlewares/logger.middleware");
const error_middleware_1 = require("interfaceAdpaters/middlewares/error.middleware");
const get_all_users_usecase_1 = require("@usecases/admin/get-all-users-usecase");
const handle_user_toggle_status_usecase_1 = require("@usecases/admin/handle-user-toggle-status.usecase");
const forgotPasswordVendorUseCase_1 = require("@usecases/vendor/forgotPasswordVendorUseCase");
const get_all_vendors_usecase_1 = require("@usecases/admin/get-all-vendors.usecase");
const handle_toggle_vendor_usecase_1 = require("@usecases/admin/handle-toggle-vendor.usecase");
const vendorExist_service_1 = require("interfaceAdpaters/services/vendor/vendorExist-service");
const revoke_refresh_token_usecase_1 = require("@usecases/auth/revoke-refresh-token.usecase");
const blacklist_token_usecase_1 = require("@usecases/auth/blacklist-token.usecase");
const google_login_usecase_1 = require("@usecases/auth/google-login-usecase");
const cloudinarySignatureService_1 = require("@frameworks/cloudinary/cloudinarySignatureService");
const add_category_usecase_1 = require("@usecases/admin/add-category.usecase");
const get_all_category_usecase_1 = require("@usecases/admin/get-all-category.usecase");
const get_requested_vendors_usecase_1 = require("@usecases/admin/get-requested-vendors.usecase");
const approve_vendor_usecase_1 = require("@usecases/admin/approve-vendor.usecase");
const reject_vendor_usecase_1 = require("@usecases/admin/reject-vendor.usecase");
const update_vendor_profile_usecase_1 = require("@usecases/vendor/update-vendor-profile.usecase");
const host_new_event_usecase_1 = require("@usecases/vendor/event/host-new-event.usecase");
const get_all_category_usecase_2 = require("@usecases/client/get-all-category.usecase");
const handle_toggle_category_usecase_1 = require("@usecases/admin/handle-toggle-category.usecase");
const OtpCacheService_1 = require("interfaceAdpaters/services/OtpCacheService");
const firebaseService_1 = require("@frameworks/firebase/firebaseService");
const notification_service_1 = require("interfaceAdpaters/services/notification.service");
const fcmtoken_usecase_1 = require("@usecases/fcmtoken.usecase");
class UseCaseRegistry {
    static registerUseCases() {
        tsyringe_1.container.register("IRegisterUseCase", {
            useClass: register_user_usecase_1.RegisterUseCase
        });
        tsyringe_1.container.register("IPasswordBcrypt", {
            useClass: password_bcrypt_1.passwordBcrypt
        });
        tsyringe_1.container.register("IOTPBcrypt", {
            useClass: OTP_bcrypt_1.OTPBcrypt
        });
        tsyringe_1.container.register("ILoginUserUseCase", {
            useClass: login_user_usecase_1.LoginUseCase
        });
        tsyringe_1.container.register("IRevokeRefreshTokenUseCase", {
            useClass: revoke_refresh_token_usecase_1.RevokeRefreshTokenUseCase
        });
        tsyringe_1.container.register("ISendEmailUseCase", {
            useClass: send_email_usecase_1.SendEmailUseCase
        });
        tsyringe_1.container.register("IVerifyOTPUseCase", {
            useClass: verify_otp_usecase_1.VerifyOTPUseCase
        });
        tsyringe_1.container.register("IGenerateTokenUseCase", {
            useClass: generate_token_usecase_1.GenerataTokenUseCase
        });
        tsyringe_1.container.register("IRefreshTokenUseCase", {
            useClass: refresh_token_usecase_1.refreshTokenUsesCase
        });
        tsyringe_1.container.register("IBlacklistTokenUseCase", {
            useClass: blacklist_token_usecase_1.BlacklistTokenUseCase
        });
        tsyringe_1.container.register("clientRegisterStrategy", {
            useClass: client_register_strategy_1.CLientRegisterStrategy
        });
        tsyringe_1.container.register("ClientLoginStrategy", {
            useClass: client_login_strategy_1.ClientLoginStrategy
        });
        tsyringe_1.container.register("ClientGoogleLoginStrategy", {
            useClass: client_google_login_strategy_1.ClientGoogleLoginStrategy
        });
        tsyringe_1.container.register("VendorRegisterStrategy", {
            useClass: vendor_register_strategy_1.VendorRegisterStrategy
        });
        tsyringe_1.container.register("VendorLoginStrategy", {
            useClass: vendor_login_strategy_1.VendorLoginStrategy
        });
        tsyringe_1.container.register("VendorGoogleLoginStrategy", {
            useClass: vendor_google_login_strategy_1.VendorGoogleLoginStrategy
        });
        tsyringe_1.container.register("AdminLoginStrategy", {
            useClass: admin_login_strategy_1.AdminLoginStrategy
        });
        tsyringe_1.container.register("ITokenService", {
            useClass: jwtService_1.jwtService
        });
        tsyringe_1.container.register("IOTPService", {
            useClass: OtpCacheService_1.OtpCacheService
        });
        tsyringe_1.container.register("ISendOTPForPasswordUseCase", {
            useClass: sent_forgot_password_otp_usecase_1.sendForgotPasswordOtp
        });
        tsyringe_1.container.register("IEmailService", {
            useClass: emailServices_1.EmailService
        });
        tsyringe_1.container.register("IUserExistenceService", {
            useClass: user_existService_1.UserExistService
        });
        tsyringe_1.container.register("IVendorExistService", {
            useClass: vendorExist_service_1.VendorExistService
        });
        tsyringe_1.container.register("IClientExistService", {
            useClass: clientExist_service_1.ClientExistService
        });
        tsyringe_1.container.register("IFirebaseService", {
            useClass: firebaseService_1.FirebaseService
        });
        tsyringe_1.container.register("INotificationService", {
            useClass: notification_service_1.NotificationService
        });
        tsyringe_1.container.register("ICloudinarySignatureService", {
            useClass: cloudinarySignatureService_1.CloudinarySignatureService
        });
        tsyringe_1.container.register("IGetAllUsersUseCase", {
            useClass: get_all_users_usecase_1.getAllUsersUseCase
        });
        tsyringe_1.container.register("IUserToggleStatusUseCase", {
            useClass: handle_user_toggle_status_usecase_1.UserToggleStatusUseCase
        });
        tsyringe_1.container.register("IGetAllVendorsUseCase", {
            useClass: get_all_vendors_usecase_1.GetAllVendorUseCase
        });
        tsyringe_1.container.register("IGetAllCategoryUseCase", {
            useClass: get_all_category_usecase_1.GetAllCategoryUseCase
        });
        tsyringe_1.container.register("IGetRequestedVendorUseCase", {
            useClass: get_requested_vendors_usecase_1.GetRequestedVendorsUseCase
        });
        tsyringe_1.container.register("IApproveVendorUseCase", {
            useClass: approve_vendor_usecase_1.ApproveVendorUseCase
        });
        tsyringe_1.container.register("IRejectVendorUseCase", {
            useClass: reject_vendor_usecase_1.RejectVendorUseCase
        });
        tsyringe_1.container.register("IHandleToggleVendorUseCase", {
            useClass: handle_toggle_vendor_usecase_1.HandleToggleVendorStatusUseCase
        });
        tsyringe_1.container.register("IHandleToggleCategoryUseCase", {
            useClass: handle_toggle_category_usecase_1.HandleToggleCategoryUseCase
        });
        tsyringe_1.container.register("IForgotClientUpdatePasswordUseCase", {
            useClass: clientUpdatePasswordSUseCase_1.ForgotClientUpdatePasswordUseCase
        });
        tsyringe_1.container.register("ForgotVendorUpdatePasswordUseCase", {
            useClass: forgotPasswordVendorUseCase_1.ForgotVendorUpdatePasswordUseCase
        });
        tsyringe_1.container.register("IEditVendorProfileUseCase", {
            useClass: update_vendor_profile_usecase_1.UpdateVendorProfileUseCase
        });
        tsyringe_1.container.register("IGoogleUseCase", {
            useClass: google_login_usecase_1.GoogleuseCase
        });
        tsyringe_1.container.register("IAddCategoryUseCase", {
            useClass: add_category_usecase_1.AddCategoryUseCase
        });
        tsyringe_1.container.register("IGetAllCategoryForClientsUseCase", {
            useClass: get_all_category_usecase_2.GetAllCategoryForClientUseCase
        });
        tsyringe_1.container.register("IHostNewEventUseCase", {
            useClass: host_new_event_usecase_1.HostNewEventUseCase
        });
        tsyringe_1.container.register("IFcmTokenUseCase", {
            useClass: fcmtoken_usecase_1.FcmTokenUseCase
        });
        // ======logger==========//
        tsyringe_1.container.register("ILogger", {
            useClass: winston_logger_adapter_1.WinstonLoggerAdapter
        });
        tsyringe_1.container.register("LoggerMiddleware", {
            useClass: logger_middleware_1.LoggerMiddleWare
        });
        // ======error handler========//
        tsyringe_1.container.register("ErrorMiddleware", {
            useClass: error_middleware_1.ErrorMiddleware
        });
    }
}
exports.UseCaseRegistry = UseCaseRegistry;
