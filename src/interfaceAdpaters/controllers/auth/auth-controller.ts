import { IAuthController } from "@entities/controllerInterfaces/auth/auth.controller.interface";
import { IBlacklistTokenUseCase } from "@entities/useCaseInterfaces/auth/blackList-token-interface";
import { IRefreshTokenUseCase } from "@entities/useCaseInterfaces/auth/generate-refresh-token.interface";
import { IGenerateTokenUseCase } from "@entities/useCaseInterfaces/auth/generate-token.interface";
import { IGoogleUseCase } from "@entities/useCaseInterfaces/auth/google-login-usecase.interface";
import { ILoginUserCase } from "@entities/useCaseInterfaces/auth/login-usecase.interface";
import { IRegisterUseCase } from "@entities/useCaseInterfaces/auth/register-usecase.interface";
import { IRevokeRefreshTokenUseCase } from "@entities/useCaseInterfaces/auth/revoke-refresh-token-usecase";
import { LoginUserDTO, UserDTO } from "@shared/dtos/user.dto";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { userSchema } from "./validations/user-signup-validation.schema";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";
import { loginSchema } from "./validations/user-login-validation.schema";
import { clearAuthCookie, setAuthCookies, updateCookieWithAccessToken } from "@shared/utils/cookie-helper";
import { CustomRequest } from "interfaceAdpaters/middlewares/auth.middleware";
import { emailVerifySchema } from "./validations/email.validation.schema";
import { IVerifyOtpUsecase } from "@entities/useCaseInterfaces/auth/verifyOtp-usecase.interface";
import { ISendEmailUseCase } from "@entities/useCaseInterfaces/auth/send-email-usercase.interface";
import { ICloudinarySignatureService } from "@entities/serviceInterfaces/cloudinary-service.interface";
import { IFcmTokenUseCase } from "@entities/useCaseInterfaces/auth/fcmtoken.interface";





@injectable()
export class AuthController implements IAuthController{
    constructor(
        @inject("IRegisterUseCase") private _registerUseCase : IRegisterUseCase,
        @inject("ILoginUserUseCase") private _loginUserUseCase : ILoginUserCase,
        @inject("IGenerateTokenUseCase") private _generateTokenUseCase : IGenerateTokenUseCase,
        @inject("IGoogleUseCase") private _googleLoginUseCase : IGoogleUseCase,
        @inject("IRefreshTokenUseCase") private _refreshTokenUseCase : IRefreshTokenUseCase,
        @inject("IRevokeRefreshTokenUseCase") private _revokeRefreshTokenUseCase : IRevokeRefreshTokenUseCase,
        @inject("IBlacklistTokenUseCase") private _blackListTokenUseCase : IBlacklistTokenUseCase,
        @inject("IVerifyOTPUseCase") private _verifyOtpUseCase : IVerifyOtpUsecase,
        @inject("IFcmTokenUseCase")  private _fcmTokenUseCase : IFcmTokenUseCase,
        @inject("ISendEmailUseCase") private _sendEmailUseCase : ISendEmailUseCase,
        @inject("ICloudinarySignatureService") private _cloudinaryService : ICloudinarySignatureService
    ){}

   async register(req: Request, res: Response): Promise<void> {
        const {role} = req.body as UserDTO

        const schema = userSchema[role]

        if(!schema){
            res.status(HTTP_STATUS.NOT_FOUND).json({success:false,message:ERROR_MESSAGES.INVALID_CREDENTIALS})
            return
        }

        const validateData = schema.parse(req.body)

        await this._registerUseCase.execute(validateData)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.REGISTERATION_SUCCESS})
    }



    async login(req: Request, res: Response): Promise<void> {
        const data = req.body as LoginUserDTO

        const validatedData = loginSchema.parse(data)

        if(!validatedData){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.INVALID_CREDENTIALS})
            return;
        }

       const user =  await this._loginUserUseCase.execute(validatedData)

        if(!user._id || !user.email || !user.role){
            throw new Error("user id , email or role is missing")
        }

        const userId = user._id.toString()

        const token = await this._generateTokenUseCase.execute(userId,user.email,user.role)

        const accessTokenName = `${user.role}_access_token`
        const refreshTokenName = `${user.role}_refresh_token`

        setAuthCookies(
            res,
            token.accessToken,
            token.refreshToken,
            accessTokenName,
            refreshTokenName
        );


        res.status(HTTP_STATUS.OK)
        .json({success:true,
        message:SUCCESS_MESSAGES.LOGIN_SUCCESS,
        user,
        accessToken:token.accessToken,
        refreshToken:token.refreshToken
        });

    }


    async authenticatedWithGoogle(req: Request, res: Response): Promise<void> {
        const {credential,role,client_id} = req.body

        const user = await this._googleLoginUseCase.execute(credential,client_id,role)

        if(!user._id ||!user.role || !user.email){
            throw new Error(
                "role,client_id or email is missing"
            )
        }

        const userId = user._id.toString()

        const token = await this._generateTokenUseCase.execute(userId,user.email,user.role)
        
        const accessTokenName = `${user.role}_access_token`
        const refreshTokenName = `${user.role}_refresh_token`

        setAuthCookies(
            res,
            token.accessToken,
            token.refreshToken,
            accessTokenName,
            refreshTokenName
        );


        res.status(HTTP_STATUS.OK)
        .json({sucess:true,message:
            SUCCESS_MESSAGES.LOGIN_SUCCESS,
            user:{
                name:user.name,
                email:user.email,
                role:user.role
            }
        });
     }


     async logout(req: Request, res: Response): Promise<void> {

        (req as CustomRequest).user

        await this._blackListTokenUseCase.execute((req as CustomRequest).user.access_token)

        await this._revokeRefreshTokenUseCase.execute((req as CustomRequest).user.refresh_token);

        const user = (req as CustomRequest).user

        const accessTokenName = `${user.role}_access_token`
        const refreshTokenName = `${user.role}_refresh_token`

        clearAuthCookie(
            res,
            accessTokenName,
            refreshTokenName
        );

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.USER_LOGOUT_SUCCESS})
     }

     async handleTokenRefresh(req: Request, res: Response): Promise<void> {
         const token = (req as CustomRequest).user.access_token

         const newToken = this._refreshTokenUseCase.execute(token)

         const access_token_name = `${newToken.role}_access_token`

         updateCookieWithAccessToken(
            res,
            newToken.accessToken,
            access_token_name
         );
         res.status(HTTP_STATUS.OK)
         .json({success:true,message:"Token Refreshed Successfully",token:newToken.accessToken})
     }


     async verifyOtp(req: Request, res: Response): Promise<void> {
         const {email,otp} = req.body;

         const validateData = emailVerifySchema.parse({email,otp})

         await this._verifyOtpUseCase.execute(validateData.email,validateData.otp)

         res.status(HTTP_STATUS.OK)
         .json({success:true,messagge:SUCCESS_MESSAGES.VERIFICATION_SUCCESS})
     }


     async sentOtpEmail(req: Request, res: Response): Promise<void> {
         const {email} =  req.body

         if(!email){
            res.status(HTTP_STATUS.NOT_FOUND)
            .json({success:false,message:ERROR_MESSAGES.EMAIL_NOT_FOUND})
         }

         await this._sendEmailUseCase.execute(email)

         res.status(HTTP_STATUS.OK)
         .json({success:true,message:SUCCESS_MESSAGES.OTP_SEND_SUCCESS})
     }


     async getUploadSignature(req: Request, res: Response): Promise<void> {

        const folder = req.query.folder

        if(!folder){
            res.status(HTTP_STATUS.NOT_FOUND)
            .json({success:false,message:ERROR_MESSAGES.FOLDER_NOT_FOUND})
        }


        const data =  this._cloudinaryService.generateSignature(folder as string)

        res.json(data)
     }


     async saveFcmToken(req: Request, res: Response): Promise<void> {
        console.log("backnd",req.body)
         const {userId,fcmToken} = req.body
        console.log("user id and token",userId,fcmToken)
         if(!userId || !fcmToken){
            res.status(HTTP_STATUS.NOT_FOUND)
            .json({success:false,message:"user id or fcm token is missing"})
            return;
         }

         await this._fcmTokenUseCase.execute(userId,fcmToken);

         res.status(HTTP_STATUS.OK)
         .json({success:true,message:"token saved successfully"})
     }
    
}