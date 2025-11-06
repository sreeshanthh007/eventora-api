import { container } from "tsyringe";

// ========strategies========//
import { IRegisterStrategy } from "@usecases/auth/register-strategies/register-strategy.interface";
import { ILoginStrategy } from "@usecases/auth/login-strategies/login-strategy.interface";
import { ClientLoginStrategy } from "@usecases/auth/login-strategies/client-login-strategy";
import { ClientGoogleLoginStrategy } from "@usecases/auth/login-strategies/client-google-login.strategy";
import { CLientRegisterStrategy } from "@usecases/auth/register-strategies/client-register-strategy";
import { VendorRegisterStrategy } from "@usecases/auth/register-strategies/vendor-register-strategy";
import { VendorLoginStrategy } from "@usecases/auth/login-strategies/vendor-login-strategy";
import { AdminLoginStrategy } from "@usecases/auth/login-strategies/admin-login-strategy";
// ======strategies========//


import { ITokenService } from "@usecases/auth/interfaces/token-service-interface";
import { jwtService } from "interfaceAdpaters/services/jwt/jwtService";
import { IEmailService } from "@entities/serviceInterfaces/email-service-interface";
import { EmailService } from "interfaceAdpaters/services/common/emailServices";
import { IOTPService } from "@entities/serviceInterfaces/otp-service.interface";
import { IUserExistenceService } from "@entities/serviceInterfaces/user-existence-service.interface";
import { UserExistService } from "interfaceAdpaters/services/common/user-existService";
import { IClientExistService } from "@entities/serviceInterfaces/client-exist.service.interface";
import { ClientExistService } from "interfaceAdpaters/services/client/clientExist-service";
import { sendForgotPasswordOtp } from "@usecases/auth/sent-forgot.password-otp.usecase";

import { IRegisterUseCase } from "@entities/useCaseInterfaces/auth/register-usecase.interface";
import { RegisterUseCase } from "@usecases/auth/register-user.usecase";
import { ILoginUserCase } from "@entities/useCaseInterfaces/auth/login-usecase.interface";
import { LoginUseCase } from "@usecases/auth/login-user.usecase";
import { ISendEmailUseCase } from "@entities/useCaseInterfaces/auth/send-email-usercase.interface";
import { SendEmailUseCase } from "@usecases/auth/send-email.usecase";
import { IVerifyOtpUsecase } from "@entities/useCaseInterfaces/auth/verifyOtp-usecase.interface";
import { VerifyOTPUseCase } from "@usecases/auth/verify-otp.usecase";
import { IGenerateTokenUseCase } from "@entities/useCaseInterfaces/auth/generate-token.interface";
import { GenerataTokenUseCase } from "@usecases/auth/generate-token.usecase";
import { IRefreshTokenUseCase } from "@entities/useCaseInterfaces/auth/generate-refresh-token.interface";
import { refreshTokenUsesCase } from "@usecases/auth/refresh-token.usecase";

import { IForgotUpdatePasswordUseCase } from "@entities/useCaseInterfaces/client/clientupdatePassword.usecase.interface";
import { ForgotClientUpdatePasswordUseCase } from "@usecases/auth/update-password/forgot-update-password.usecase";

// =====error====//
import { ILogger } from "interfaceAdpaters/services/logger/logger.interface";
import { WinstonLoggerAdapter } from "interfaceAdpaters/services/logger/winston-logger-adapter";
import { LoggerMiddleWare } from "interfaceAdpaters/middlewares/logger.middleware";
import { ErrorMiddleware } from "interfaceAdpaters/middlewares/error.middleware";
// ====error====//



import { ISendOtpUsecase } from "@entities/useCaseInterfaces/auth/sendOtp-usecase.interface";
import { IGetAllUsersUseCase } from "@entities/useCaseInterfaces/admin/get-all-users.usecase.interface";
import { getAllUsersUseCase } from "@usecases/admin/get-all-users-usecase";
import { IuserToggleStatusUseCase } from "@entities/useCaseInterfaces/admin/handle-user-toggle-status.usecase.interface";
import { UserToggleStatusUseCase } from "@usecases/admin/handle-user-toggle-status.usecase";
import { ForgotVendorUpdatePasswordUseCase } from "@usecases/vendor/forgotPasswordVendorUseCase";
import { IGetAllVendorsUseCase } from "@entities/useCaseInterfaces/admin/get-all-vendors.usecase.interface";
import { GetAllVendorUseCase } from "@usecases/admin/get-all-vendors.usecase";
import { IHandleToggleVendorUseCase } from "@entities/useCaseInterfaces/admin/handle-toggle.vendor.usecase.interface";
import { HandleToggleVendorStatusUseCase } from "@usecases/admin/handle-toggle-vendor.usecase";
import { IVendorExistService } from "@entities/serviceInterfaces/vendor-exist.service.interface";
import { VendorExistService } from "interfaceAdpaters/services/vendor/vendorExist-service";
import { IRevokeRefreshTokenUseCase } from "@entities/useCaseInterfaces/auth/revoke-refresh-token-usecase";
import { RevokeRefreshTokenUseCase } from "@usecases/auth/revoke-refresh-token.usecase";
import { IBlacklistTokenUseCase } from "@entities/useCaseInterfaces/auth/blackList-token-interface";
import { BlacklistTokenUseCase } from "@usecases/auth/blacklist-token.usecase";
import { IGoogleUseCase } from "@entities/useCaseInterfaces/auth/google-login-usecase.interface";
import { GoogleuseCase } from "@usecases/auth/google-login-usecase";
import { ICloudinarySignatureService } from "@entities/serviceInterfaces/cloudinary-service.interface";
import { CloudinarySignatureService } from "@frameworks/cloudinary/cloudinarySignatureService";
import { IAddCategoryUseCase } from "@entities/useCaseInterfaces/admin/add-category.usecase.interface";
import { AddCategoryUseCase } from "@usecases/admin/add-category.usecase";
import { IGetAllCatgoryUseCase } from "@entities/useCaseInterfaces/admin/get-all-category.usecase.interface";
import { GetAllCategoryUseCase } from "@usecases/admin/get-all-category.usecase";
import { IGetRequestedVendorsUseCase } from "@entities/useCaseInterfaces/admin/get-requested-vendors.usecase.interfaces";
import { GetRequestedVendorsUseCase } from "@usecases/admin/get-requested-vendors.usecase";
import { IApproveVendorUseCase } from "@entities/useCaseInterfaces/admin/approve-vendor.usecase.interface";
import { ApproveVendorUseCase } from "@usecases/admin/approve-vendor.usecase";
import { IRejectVendorUseCase } from "@entities/useCaseInterfaces/admin/reject-vendor.usecase.interface";
import { RejectVendorUseCase } from "@usecases/admin/reject-vendor.usecase";
import { IHostNewEventUseCase } from "@entities/useCaseInterfaces/vendor/event/host-new-event.usecase";
import { HostNewEventUseCase } from "@usecases/vendor/event/host-new-event.usecase";
import { IGetAllCategoryForClientsUseCase } from "@entities/useCaseInterfaces/client/category/get-all-category-clients.usecase.interface";
import { GetAllCategoryForClientUseCase } from "@usecases/client/get-all-category.usecase";
import { IHandleToggleCategoryUseCase } from "@entities/useCaseInterfaces/admin/handle-toggle-category.usecase.interface";
import { HandleToggleCategoryUseCase } from "@usecases/admin/handle-toggle-category.usecase";
import { OtpService } from "interfaceAdpaters/services/common/OtpService";
import { IFirebaseService } from "@entities/serviceInterfaces/firebase.service.interface";
import { FirebaseService } from "@frameworks/firebase/firebaseService";
import { INotificationService } from "@entities/serviceInterfaces/notification.service.interface";
import { NotificationService } from "interfaceAdpaters/services/common/notification.service";
import { IFcmTokenUseCase } from "@entities/useCaseInterfaces/auth/fcmtoken.interface";
import { FcmTokenUseCase } from "@usecases/fcmToken/fcmtoken.usecase";
import { IResendVerificationUseCase } from "@entities/useCaseInterfaces/admin/resend-verification.usecase.interface";
import { resendVerificationUseCase } from "@usecases/vendor/resend-verification.usecase";
import { IGetAllEventsUseCase } from "@entities/useCaseInterfaces/vendor/event/get-all-events-vendor.usecase.interface";
import { GetAllEventsUseCase } from "@usecases/vendor/event/get-all-events.usecase";
import { IToggleStatusUseCase } from "@entities/useCaseInterfaces/vendor/event/toggleStatus.usecase.interface";
import { ToggleStatusUseCase } from "@usecases/vendor/event/toggle-status.usecase";
import { IGetAllUsersDetailsUseCase } from "@entities/useCaseInterfaces/get-all-users.interface.usecase";
import { GetAllUsersDetailsUseCase } from "@usecases/common/get-all-users.usecase";
import { IUpdateProfileImageUseCase } from "@entities/useCaseInterfaces/client/updateProfileImage.usecase.interface";
import { UpdateProfileImageUseCase } from "@usecases/common/update-profileImage.usecase";
import { IUpdatePersonalInformationUseCase } from "@entities/useCaseInterfaces/client/update-personal-information.interface.usecase";
import { ClientUpdatePersonalInformationUseCase } from "@usecases/client/update-personal-information.usecase";
import { IUpdateVendorPersonalInformationUseCase } from "@entities/useCaseInterfaces/vendor/update-vendor-personal.usecase.interface";
import { UpdateVendorPersonalInformationUseCase } from "@usecases/vendor/update-vendor-personal-information.usecase";
import { IEditCategoryUseCase } from "@entities/useCaseInterfaces/admin/edit-category.usecase.interface";
import { EditCategoryUseCase } from "@usecases/admin/edit-category.usecase";
import { IAddServiceUseCase } from "@entities/useCaseInterfaces/vendor/service/add-service.interface.usecase";
import { AddServiceUseCase } from "@usecases/vendor/service/add-service.usecase";
import { IGetAllCategoryForServiceUseCase } from "@entities/useCaseInterfaces/get-category-for-service.interface.usecase";
import { GetCategoriesForServiceUseCase } from "@usecases/get-category-for-service.usecase";
import { IEditServiceUseCase } from "@entities/useCaseInterfaces/vendor/service/edit-service.interface.usecase";
import { EditServiceUseCase } from "@usecases/vendor/service/edit-service.usecase";
import { IGetAllServiceUseCase } from "@entities/useCaseInterfaces/vendor/service/get-all-service-vendor.interface.usecase";
import { GetAllServiceUseCase } from "@usecases/vendor/service/get-all-service.usecase";
import { IGetServiceByIdUseCase } from "@entities/useCaseInterfaces/vendor/service/get-service-by-id.interface.usecase";
import { GetServiceByIdUseCase } from "@usecases/vendor/service/get-service-by-id.usecase";
import { IToggleServiceStatusUseCase } from "@entities/useCaseInterfaces/vendor/service/toggle-service.interface.usecase";
import { toggleServiceStatusUseCase } from "@usecases/vendor/service/toggle-service-status.usecase";
import { IUpdateEventUseCase } from "@entities/useCaseInterfaces/vendor/event/update-event.usecase.interface";
import { UpdateEventUseCase } from "@usecases/vendor/event/update-event-usecase";
import { IGetEventByIdUseCase } from "@entities/useCaseInterfaces/vendor/event/get-event-by-id..usecase.interface";
import { GetEventsByIdUseCase } from "@usecases/vendor/event/get-events-by-id.usecase";
import { IGetAllEventsForClientsUseCase } from "@entities/useCaseInterfaces/client/event/get-all-events-clients.usecase.interface";
import { GetAllEventsForClientsUseCase } from "@usecases/client/get-all-events.usecase";
import { IUpdateEventStatusUseCase } from "@entities/useCaseInterfaces/vendor/event/update-event-status.usecase.interface";
import { UpdateEventStatusUseCase } from "@usecases/vendor/event/update-event-status.usecase";
import { IGetEventDetailsUseCase } from "@entities/useCaseInterfaces/client/event/get-event-details-clients.interface.usecase";
import { GetEventDetailsUseCase } from "@usecases/client/get-event-details.usercase";
import { IGetAllEventsWithFilterUseCase } from "@entities/useCaseInterfaces/client/event/get-all-events-with-filters.usercase.interface";
import { GetAllEventsWithFilterUseCase } from "@usecases/client/get-all-events-with-filter.usecase";
import { ILockService } from "@entities/serviceInterfaces/ticket-lock-service.interface";
import { RedisLockService } from "interfaceAdpaters/services/common/redis-lock-service";
import { StripeService } from "interfaceAdpaters/services/stripe/stripe-service";
import { IQrCodeService } from "@entities/serviceInterfaces/qr-code-service.interface";
import { QrCodeService } from "interfaceAdpaters/services/common/qrCode-service";
import { IStripeService } from "@entities/serviceInterfaces/stripe-service-interface";
import { IHandleEventWebHookUseCase } from "@entities/useCaseInterfaces/client/event/event-webhook-handle.usecase.interface";
import { EventWebHookHandleUseCase } from "@usecases/client/event-webhook-handle.usecase";
import { IGetAllServiceWithFilterUseCase } from "@entities/useCaseInterfaces/client/service/get-all-service-with-filter.usecase.interface";
import { GetAllServicesWithFilterUseCase } from "@usecases/client/get-all-service-with-filter.usecase";
import { IGetAllServiceDetailsUseCase } from "@entities/useCaseInterfaces/client/service/get-service-details.usecase.interface";
import { GetServiceDetailsUseCase } from "@usecases/client/get-all-service-details.usecase";
import { IClientGetEventBookingUseCase } from "@entities/useCaseInterfaces/client/event/client-get-event-booking.usecase.interface";
import { ClientGetEventBookingsUseCase } from "@usecases/client/client-get-event-bookings.usecase";
import { IOtpCacheService } from "@entities/serviceInterfaces/otp-cache-service.interface";
import { OtpCacheService } from "interfaceAdpaters/services/common/otp-cache-service";
import { BcryptService } from "interfaceAdpaters/services/security/bcrypt-service";
import { IBcryptService } from "@entities/serviceInterfaces/bcrypt-service.interface";
import {  IChangeClientPasswordUseCase } from "@entities/useCaseInterfaces/client/change-password-client-usecase.interface";
import { ChangePasswordClientUseCase } from "@usecases/client/change-password-client-usecase";
import { IChangeVendorPasswordUseCase } from "@entities/useCaseInterfaces/vendor/change-password-vendor.usecase.interface";
import { ChangeVendorPasswordUseCase } from "@usecases/vendor/change-vendor-password.usecase";
import { IAddWorkSampleUseCase } from "@entities/useCaseInterfaces/vendor/worksample/add-work-sample.usecase.interface";
import { AddWorksampleUseCase } from "@usecases/vendor/worksample/add-work-sample.usecase";
import { IGetworkSampleDataUseCase } from "@entities/useCaseInterfaces/vendor/worksample/get-work-sample-data.usecase";
import { GetWorkSampleDataUseCase } from "@usecases/vendor/worksample/get-work-sample-data.usecase";
import { IEditWorkSampleUseCase } from "@entities/useCaseInterfaces/vendor/worksample/edit-work-sample.usecase.interface";
import { EditWorkSampleUseCase } from "@usecases/vendor/worksample/edit-work-sample.usecase";
import { ICreateBookingUseCase } from "@entities/useCaseInterfaces/client/creating-booking-usercase.interface";
import { CreateBookingUseCase } from "@usecases/client/create-ticket-booking-usecase";
import { IGetCategoryForFilterUseCase } from "@entities/useCaseInterfaces/client/category/get-category-for-filter.usecase.interface";
import { GetCategoryForFilterUseCase } from "@usecases/client/get-all-category-for-filter.usecase";
import { IScanAndVerifyAttendiesUseCase } from "@entities/useCaseInterfaces/vendor/scan-verify-attendies.usecase.interface";
import { ScanAndVerifyAttendiesUseCase } from "@usecases/vendor/scan-verify-attendies.usecase";
import { IGetServicesProvidedByVendorsUseCase } from "@entities/useCaseInterfaces/client/service/get-services-provided-vendors.usecase.interface";
import { GetServicesProvidedByVendorsUseCase } from "@usecases/client/get-services-provided-vendors.usecase";
import { IGetClientWalletDetailsUseCase } from "@entities/useCaseInterfaces/client/get-client-wallet-details.usecase.interface";
import { GetClientWalletDetailsUseCase } from "@usecases/client/get-client-wallet-details.usecase";
import { IGetVendorWalletDetailsUseCase } from "@entities/useCaseInterfaces/vendor/get-vendor-wallet-details.usecase.interface";
import { GetVendorWalletDetailsUseCase } from "@usecases/vendor/get-vendor-wallet-details.usecase";
import { IGetAdminWalletDetailsUseCase } from "@entities/useCaseInterfaces/admin/get-admin-wallet-details.usecase.interface";
import { GetAdminWalletDetailsUseCase } from "@usecases/admin/get-admin-wallet-details.usecase";
import { IScanAndVerifyTicketsUseCase } from "@entities/useCaseInterfaces/vendor/scan-and-verify-tickets.usecase.interface";
import { ScanAndVerifyTicketsUseCase } from "@usecases/vendor/scan-and-verify-tickets.usecase";
import { ICreateServiceBookingUseCase } from "@entities/useCaseInterfaces/client/service/create-service-booking-usercase.interface";
import { CreateServiceBookingUseCase } from "@usecases/client/create-service-booking.usecase";
import { IHandleServiceBookingWebhookUseCase } from "@entities/useCaseInterfaces/client/service/handle-service-booking-webhook.usecase.interface";
import { HandleServiceBookingWebhookUseCase } from "@usecases/client/handle-service-booking-webhook.usecase";
import { IServicebookingStripeService } from "@entities/serviceInterfaces/service-booking-stripe.service";
import { ServiceBookingStripeService } from "interfaceAdpaters/services/stripe/service-booking-stripe-sevice";
import { IGetVendorBookingUseCase } from "@entities/useCaseInterfaces/vendor/get-vendor-booking.usecase.interface";
import { GetVendorBookingsUseCase } from "@usecases/vendor/get-vendor-bookings.usecase";
import { IGetTicketDetailsUseCase } from "@entities/useCaseInterfaces/vendor/get-ticket-details.usecase.interface";
import { GetTicketDetailsUseCase } from "@usecases/vendor/get-ticket-details.usecase";
import { ICancelTicketUseCase } from "@entities/useCaseInterfaces/client/event/cancel-ticket.usecase.interface";
import { CancelTicketUseCase } from "@usecases/client/cancel-ticket.usecase";
import { IGetVendorWorkFolioUseCase } from "@entities/useCaseInterfaces/client/get-workfolio-of-vendor.usecase.interface";
import { GetWorkfolioOfVendorUseCase } from "@usecases/client/get-workfolio-of-vendor.usecase";
import { IGetAllNotificationUseCase } from "@entities/useCaseInterfaces/get-all-notification.usecase.interface";
import { GetAllNotificationUseCase } from "@usecases/common/get-all-notification.usecase";
import { IAddRatingUseCase } from "@entities/useCaseInterfaces/client/rating/add-rating.usecase.interface";
import { AddRatingUseCase } from "@usecases/client/add-rating.usecase";
import { IEditRatingUseCase } from "@entities/useCaseInterfaces/client/rating/edit-rating.usecase.interface";
import { EditRatingUseCase } from "@usecases/client/edit-rating.usecase";
import { IGetClientBookedServicesUseCase } from "@entities/useCaseInterfaces/client/service/client-get-booked-service.usecase.interface";
import { GetClientBookedServicesUseCase } from "@usecases/client/get-client-booked-service.usecase";
import { IMarkAsReadNotificationUseCase } from "@entities/useCaseInterfaces/client/mark-as-read-notification.usecase.interface";
import { MarkAsReadNotificaionUseCase } from "@usecases/common/mark-as-read-notification.usecase";
import { SlotGeneratorService } from "interfaceAdpaters/services/common/slot-generator.service";
import { ISlotGeneratorService } from "@entities/serviceInterfaces/slot-generator.service.interface";
import { IGetAllRatingsWithAverageUseCase } from "@entities/useCaseInterfaces/client/rating/get-rating.usecase.interface";
import { GetAllRatingsWithAverageUseCase } from "@usecases/client/get-all-rating.usecase";
import { IRemoveReviewUseCase } from "@entities/useCaseInterfaces/client/rating/remove-review.usecase.interface";
import { RemoveReviewUseCase } from "@usecases/client/remove-review.usecase";
import { ICancelServiceUseCase } from "@entities/useCaseInterfaces/client/service/cancel-service.usecase.interface";
import { CancelServiceUseCase } from "@usecases/client/cancel-service.usecase";
import { IStartBookedServiceUseCase } from "@entities/useCaseInterfaces/vendor/start-booked-service.usecase.interface";
import { StartBookedServiceUseCase } from "@usecases/vendor/start-booked-service.usecase";
import { IStopBookedServiceUseCase } from "@entities/useCaseInterfaces/vendor/stop-booked-service.usecase.interface";
import { StopBookedServiceUseCase } from "@usecases/vendor/stop-booked-service.usecase";
import { IGetAllChatsByUserUseCase } from "@entities/useCaseInterfaces/chat/get-all-chats-user.usecase.interface";
import { GetAllChatsByUserUseCase } from "@usecases/chat/get-all-chats-user.usecase";
import { IGetChatByChatIdUseCase } from "@entities/useCaseInterfaces/chat/get-chats-chatId.usecase.interface";
import { GetChatByChatIdUseCase } from "@usecases/chat/get-chat-chatId.usecase";
import { ICreateChatRoomUseCase } from "@entities/useCaseInterfaces/chat/createChatRoom.usecase.interface";
import { CreateChatRoomUseCase } from "@usecases/chat/create-chat-room.usecase";
import { IGetChatByuserUseCase } from "@entities/useCaseInterfaces/chat/get-chat-user.usecase.interface";
import { GetChatbyUserUseCase } from "@usecases/chat/get-chat-user.usercase";
import { ISendMessageUseCase } from "@entities/useCaseInterfaces/chat/send-message.usecase.interface";
import { SendMessageUseCase } from "@usecases/chat/send-message.usecase";
import { IReadMessageUseCase } from "@entities/useCaseInterfaces/chat/read-message.usecase.interface";
import { ReadMessageUseCase } from "@usecases/chat/read-message.usecase";
import { IGetAdminAnalyticsDashboardUseCase } from "@entities/useCaseInterfaces/dashboard/get-admin-analytics-dashboard.usecase.interface";
import { GetAdminAnalyticsDashboardUseCase } from "@usecases/dashboard/get-admin-analytics-dashboard.usecase";
import { IGetVendorAnalyticsDashboardUseCase } from "@entities/useCaseInterfaces/dashboard/get-vendor-analytics-dashboard.usecase.interface";
import { GetVendorAnalyticsDashboardUseCase } from "@usecases/dashboard/get-vendor-analytics-dashboard.usecase";





export class UseCaseRegistry {
  static registerUseCases(): void {
    container.register<IRegisterUseCase>("IRegisterUseCase", {
      useClass: RegisterUseCase,
    });

    // ==========RRULE SERVICE ADDING=============== 
  

    container.register<IBcryptService>("IPasswordBcryptService", {
      useClass: BcryptService,
    });

    container.register<IBcryptService>("IOTPBcryptService", {
      useClass: BcryptService,
    });

    container.register<ILoginUserCase>("ILoginUserUseCase", {
      useClass: LoginUseCase,
    });

    container.register<IRevokeRefreshTokenUseCase>(
      "IRevokeRefreshTokenUseCase",
      {
        useClass: RevokeRefreshTokenUseCase,
      }
    );

    container.register<ISendEmailUseCase>("ISendEmailUseCase", {
      useClass: SendEmailUseCase,
    });

    container.register<IVerifyOtpUsecase>("IVerifyOTPUseCase", {
      useClass: VerifyOTPUseCase,
    });
    container.register<IGenerateTokenUseCase>("IGenerateTokenUseCase", {
      useClass: GenerataTokenUseCase,
    });

    container.register<IRefreshTokenUseCase>("IRefreshTokenUseCase", {
      useClass: refreshTokenUsesCase,
    });

    container.register<IBlacklistTokenUseCase>("IBlacklistTokenUseCase", {
      useClass: BlacklistTokenUseCase,
    });

    container.register<IRegisterStrategy>("clientRegisterStrategy", {
      useClass: CLientRegisterStrategy,
    });

    container.register<ILoginStrategy>("ClientLoginStrategy", {
      useClass: ClientLoginStrategy,
    });

    container.register<ILoginStrategy>("ClientGoogleLoginStrategy", {
      useClass: ClientGoogleLoginStrategy,
    });

    container.register<IRegisterStrategy>("VendorRegisterStrategy", {
      useClass: VendorRegisterStrategy,
    });

    container.register<ILoginStrategy>("VendorLoginStrategy", {
      useClass: VendorLoginStrategy,
    });

 

    container.register<ILoginStrategy>("AdminLoginStrategy", {
      useClass: AdminLoginStrategy,
    });

    container.register<ITokenService>("ITokenService", {
      useClass: jwtService,
    });

    container.register<IOTPService>("IOTPService", {
      useClass: OtpService,
    });

    container.register<ISendOtpUsecase>("ISendOTPForPasswordUseCase", {
      useClass: sendForgotPasswordOtp,
    });

    container.register<IEmailService>("IEmailService", {
      useClass: EmailService,
    });

    container.register<IUserExistenceService>("IUserExistenceService", {
      useClass: UserExistService,
    });

    container.register<IVendorExistService>("IVendorExistService", {
      useClass: VendorExistService,
    });

    container.register<IClientExistService>("IClientExistService", {
      useClass: ClientExistService,
    });

    container.register<IFirebaseService>("IFirebaseService", {
      useClass: FirebaseService,
    });

    container.register<IOtpCacheService>("IOtpCacheService",{
      useClass:OtpCacheService
    });

    container.register<INotificationService>("INotificationService", {
      useClass: NotificationService,
    });

   container.register<ILockService>("IRedisLockService",{
      useClass:RedisLockService
   });

   container.register<IStripeService>("IStripeService",{
    useClass:StripeService
   });

   container.register<IQrCodeService>("IQRCodeService",{
    useClass:QrCodeService
   })

    container.register<ICloudinarySignatureService>(
      "ICloudinarySignatureService",
      {
        useClass: CloudinarySignatureService,
      }
    );

    container.register<IGetAllUsersUseCase>("IGetAllUsersUseCase", {
      useClass: getAllUsersUseCase,
    });

    container.register<IGetAllUsersDetailsUseCase>(
      "IGetAllUsersDetailsUseCase",
      {
        useClass: GetAllUsersDetailsUseCase,
      }
    );

    container.register<IuserToggleStatusUseCase>("IUserToggleStatusUseCase", {
      useClass: UserToggleStatusUseCase,
    });

    container.register<IGetAllVendorsUseCase>("IGetAllVendorsUseCase", {
      useClass: GetAllVendorUseCase,
    });

    container.register<IGetAllCatgoryUseCase>("IGetAllCategoryUseCase", {
      useClass: GetAllCategoryUseCase,
    });

    container.register<IToggleStatusUseCase>("IToggleStatusUseCase", {
      useClass: ToggleStatusUseCase,
    });

    container.register<IGetRequestedVendorsUseCase>(
      "IGetRequestedVendorUseCase",
      {
        useClass: GetRequestedVendorsUseCase,
      }
    );

    container.register<IApproveVendorUseCase>("IApproveVendorUseCase", {
      useClass: ApproveVendorUseCase,
    });

    container.register<IRejectVendorUseCase>("IRejectVendorUseCase", {
      useClass: RejectVendorUseCase,
    });

    container.register<IResendVerificationUseCase>(
      "IResendVerificationUseCase",
      {
        useClass: resendVerificationUseCase,
      }
    );

    container.register<IGetAllEventsUseCase>("IGetAllEventsUseCase", {
      useClass: GetAllEventsUseCase,
    });

    container.register<IClientGetEventBookingUseCase>("IClientGetEventBookingUseCase",{
      useClass:ClientGetEventBookingsUseCase
  });
  
  
    container.register<IGetAllEventsWithFilterUseCase>("IGetAllEventsWithFilterUseCase",{
      useClass:GetAllEventsWithFilterUseCase
    });

    container.register<IGetEventDetailsUseCase>("IGetEventDetailsUseCase",{
      useClass:GetEventDetailsUseCase
    });

    container.register<IHandleToggleVendorUseCase>(
      "IHandleToggleVendorUseCase",
      {
        useClass: HandleToggleVendorStatusUseCase,
      }
    );

    container.register<IHandleToggleCategoryUseCase>(
      "IHandleToggleCategoryUseCase",
      {
        useClass: HandleToggleCategoryUseCase,
      }
    );

    container.register<IForgotUpdatePasswordUseCase>(
      "IForgotUpdatePasswordUseCase",
      {
        useClass: ForgotClientUpdatePasswordUseCase,
      }
    );

    container.register<IForgotUpdatePasswordUseCase>(
      "ForgotVendorUpdatePasswordUseCase",
      {
        useClass: ForgotVendorUpdatePasswordUseCase,
      }
    );

    container.register<IUpdateProfileImageUseCase>(
      "IUpdateProfileImageUseCase",
      {
        useClass: UpdateProfileImageUseCase,
      }
    );

    container.register<IUpdatePersonalInformationUseCase>(
      "IUpdatePersonalInformationUseCase",
      {
        useClass: ClientUpdatePersonalInformationUseCase,
      }
    );

    container.register<IGoogleUseCase>("IGoogleUseCase", {
      useClass: GoogleuseCase,
    });

    container.register<IAddCategoryUseCase>("IAddCategoryUseCase", {
      useClass: AddCategoryUseCase,
    });

    container.register<IEditCategoryUseCase>("IEditCategoryUseCase", {
      useClass: EditCategoryUseCase,
    });

    container.register<IUpdateVendorPersonalInformationUseCase>(
      "IUpdateVendorPersonalInformationUseCase",
      {
        useClass: UpdateVendorPersonalInformationUseCase,
      }
    );

    container.register<IGetAllCategoryForClientsUseCase>(
      "IGetAllCategoryForClientsUseCase",
      {
        useClass: GetAllCategoryForClientUseCase,
      }
    );


    container.register<IGetAllNotificationUseCase>("IGetAllNotificationUseCase",{
      useClass:GetAllNotificationUseCase
    });

    container.register<IMarkAsReadNotificationUseCase>("IMarkAsReadNotificationUseCase",{
      useClass:MarkAsReadNotificaionUseCase
    });

    container.register<IGetAllCategoryForServiceUseCase>("IGetCategoriesForServiceUseCase",{

      useClass:GetCategoriesForServiceUseCase
    })

    container.register<IGetCategoryForFilterUseCase>("IGetCategoriesForFilterUseCase",{
      useClass:GetCategoryForFilterUseCase
    });

    container.register<IHostNewEventUseCase>("IHostNewEventUseCase", {
      useClass: HostNewEventUseCase,
    });


    container.register<IUpdateEventUseCase>("IUpdateEventUseCase",{
      useClass:UpdateEventUseCase
    });

    container.register<ICreateServiceBookingUseCase>("ICreateServiceBookingUseCase",{
      useClass:CreateServiceBookingUseCase
    });

    container.register<IHandleServiceBookingWebhookUseCase>("IHandleServiceBookingWebhookUseCase",{
      useClass:HandleServiceBookingWebhookUseCase
    });

    container.register<IScanAndVerifyAttendiesUseCase>("IScanAndVerifyAttendiesUseCase",{
      useClass:ScanAndVerifyAttendiesUseCase
    });

    container.register<IGetTicketDetailsUseCase>("IGetTicketDetailsUseCase",{
      useClass:GetTicketDetailsUseCase
    });

    container.register<IGetClientBookedServicesUseCase>("IGetClientBookedServiceUseCase",{
      useClass:GetClientBookedServicesUseCase
    });

    container.register<ISlotGeneratorService>("ISlotGeneratorService",{
      useClass:SlotGeneratorService
    });

    container.register<ICancelTicketUseCase>("ICancelTicketUseCase",{
      useClass:CancelTicketUseCase
    });
    
    container.register<IScanAndVerifyTicketsUseCase>("IScanAndVerifyTicketsUseCase",{
      useClass:ScanAndVerifyTicketsUseCase
    });
    
    container.register<IChangeClientPasswordUseCase>("IChangeClientPasswordClientUseCase",{
      useClass:ChangePasswordClientUseCase
    });


    container.register<IServicebookingStripeService>("IServiceBookingStripeService",{
      useClass:ServiceBookingStripeService
    });

    container.register<IGetVendorBookingUseCase>("IGetVendorBookingsUseCase",{
      useClass:GetVendorBookingsUseCase
    });
    
    // container.register<IGetClientBookedServicesUseCase>("IGetClientBookedServiceUseCase",{
    //   useClass:GetClientBookedServicesUseCase
    // });

    container.register<IChangeVendorPasswordUseCase>("IChangeVendorPasswordUseCase",{
      useClass:ChangeVendorPasswordUseCase
    });
    
    container.register<IHandleEventWebHookUseCase>("IHandleEventWebhookUseCase",{
      useClass:EventWebHookHandleUseCase
    });

    container.register<IUpdateEventStatusUseCase>("IUpdateEventStatusUseCase",{
      useClass:UpdateEventStatusUseCase
    });
    
    container.register<IGetEventByIdUseCase>("IGetEventsByIdUseCase",{
      useClass:GetEventsByIdUseCase
    });

    container.register<IGetAllEventsForClientsUseCase>("IGetAllEventsForClientsUseCase",{
      useClass:GetAllEventsForClientsUseCase
    });

    container.register<IGetAllServiceWithFilterUseCase>("IGetAllServiceForClientUseCase",{
      useClass:GetAllServicesWithFilterUseCase
    });

    container.register<ICreateBookingUseCase>("ICreateBookingUseCase",{
      useClass:CreateBookingUseCase
    });
    
    container.register<IAddServiceUseCase>("IAddServiceUseCase", {
      useClass: AddServiceUseCase,
    });

    container.register<IEditServiceUseCase>("IEditServiceUseCase",{
      useClass:EditServiceUseCase
    });

    container.register<IGetAllServiceUseCase>("IGetAllServiceUsecase",{
      useClass:GetAllServiceUseCase
    });

    container.register<IGetAllServiceDetailsUseCase>("IGetServiceDetailsUseCase",{
    useClass:GetServiceDetailsUseCase
    });

    container.register<IGetServicesProvidedByVendorsUseCase>("IGetServicesProvidedByVendorsUseCase",{
      useClass:GetServicesProvidedByVendorsUseCase
    });

    container.register<ICancelServiceUseCase>("ICancelServiceUseCase",{
      useClass:CancelServiceUseCase
    });

    container.register<IStartBookedServiceUseCase>("IStartBookedServiceUseCase",{
      useClass:StartBookedServiceUseCase
    });
    
    container.register<IStopBookedServiceUseCase>("IStopBookedServiceUseCase",{
      useClass:StopBookedServiceUseCase
    });

    container.register<IAddWorkSampleUseCase>("IAddWorkSampleUseCase",{
      useClass:AddWorksampleUseCase
    });

  

    container.register<IGetworkSampleDataUseCase>("IGetWorkSampleDataUseCase",{
      useClass:GetWorkSampleDataUseCase
    });
  

    container.register<IEditWorkSampleUseCase>("IEditWorkSampleUseCase",{
      useClass:EditWorkSampleUseCase
    });



    container.register<IAddRatingUseCase>("IAddRatingUseCase",{
      useClass:AddRatingUseCase
    });

    container.register<IEditRatingUseCase>("IEditRatingUseCase",{
      useClass:EditRatingUseCase
    });

    container.register<IGetAllRatingsWithAverageUseCase>("IGetAllRatingsWithAverageUseCase",{
      useClass:GetAllRatingsWithAverageUseCase
    });

    container.register<IRemoveReviewUseCase>("IRemoveReviewUseCase",{
      useClass:RemoveReviewUseCase
    });

    container.register<IGetVendorWorkFolioUseCase>("IGetWorkFolioforClientUseCase",{
      useClass:GetWorkfolioOfVendorUseCase
    });

    container.register<IGetServiceByIdUseCase>("IGetServiceByIdUseCase",{
      useClass:GetServiceByIdUseCase
    });
   
    container.register<IToggleServiceStatusUseCase>("IToggleServiceStatusUseCase",{
      useClass:toggleServiceStatusUseCase
    });

    container.register<IGetClientWalletDetailsUseCase>("IGetClientWalletDetailsUseCase",{
      useClass:GetClientWalletDetailsUseCase
    });
    container.register<IGetVendorWalletDetailsUseCase>("IGetVendorWalletDetailsUseCase",{
      useClass:GetVendorWalletDetailsUseCase
    });
    
    container.register<IGetAdminWalletDetailsUseCase>("IGetAdminWalletDetailsUseCase",{
      useClass:GetAdminWalletDetailsUseCase
    });
    


    container.register<IGetAdminAnalyticsDashboardUseCase>("IGetAdminAnalyticsDashboardUseCase",{
      useClass:GetAdminAnalyticsDashboardUseCase
    });


    container.register<IGetVendorAnalyticsDashboardUseCase>("IGetVendorAnalyticsDashboardUseCase",{
      useClass:GetVendorAnalyticsDashboardUseCase
    });
    
    container.register<IFcmTokenUseCase>("IFcmTokenUseCase", {
      useClass: FcmTokenUseCase,
    });








    container.register<IGetAllChatsByUserUseCase>("IGetAllChatsByUserUseCase",{
      useClass:GetAllChatsByUserUseCase
    });


    container.register<IGetChatByChatIdUseCase>("IGetChatByChatIdUseCase",{
      useClass:GetChatByChatIdUseCase
    });

    container.register<ICreateChatRoomUseCase>("ICreateChatRoomUseCase",{
      useClass:CreateChatRoomUseCase
    });

    container.register<IGetChatByuserUseCase>("IGetChatbyUserUseCase",{
      useClass:GetChatbyUserUseCase
    });

    container.register<ISendMessageUseCase>("ISendMessageUseCase",{
      useClass:SendMessageUseCase
    });

    container.register<IReadMessageUseCase>("IReadMessageUseCase",{
      useClass:ReadMessageUseCase
    });

    
    // ======logger==========//

    container.register<ILogger>("ILogger", {
      useClass: WinstonLoggerAdapter,
    });

    container.register<LoggerMiddleWare>("LoggerMiddleware", {
      useClass: LoggerMiddleWare,
    });

    // ======error handler========//
    container.register<ErrorMiddleware>("ErrorMiddleware", {
      useClass: ErrorMiddleware,
    });
  }
}
