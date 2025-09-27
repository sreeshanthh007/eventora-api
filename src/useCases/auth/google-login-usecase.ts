import { IGoogleUseCase } from "@entities/useCaseInterfaces/auth/google-login-usecase.interface";
import { inject, injectable } from "tsyringe";
import { IRegisterStrategy } from "./register-strategies/register-strategy.interface";
import { ILoginStrategy } from "./login-strategies/login-strategy.interface";
import { OAuth2Client } from "google-auth-library";;
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, GOOGLE_LOGIN_SUCCESS_MESSAGE, HTTP_STATUS, TRole } from "@shared/constants";
import { IEmailService } from "@entities/serviceInterfaces/email-service-interface";
import { UserResponseDTO } from "@shared/dtos/user.dto";



@injectable()
export class GoogleuseCase implements IGoogleUseCase {
    private registerStrategies : Record<string,IRegisterStrategy>
    private loginStrategies : Record<string,ILoginStrategy>
    private client : OAuth2Client

    constructor(
        @inject("clientRegisterStrategy") private clientRegister : IRegisterStrategy,

        @inject("ClientGoogleLoginStrategy") private clientLogin : ILoginStrategy,
        @inject("IEmailService") private emailService : IEmailService
    ){
        this.registerStrategies = { 
            client:this.clientRegister,
        };

        this.loginStrategies = {
            client:this.clientLogin,
        };

        this.client = new OAuth2Client()
    }

    async execute(credential: string, client_id: string, role: TRole): Promise<UserResponseDTO> {
        
             const registerStrategy =  this.registerStrategies[role]
        const loginStrategy = this.loginStrategies[role]
        
        if(!registerStrategy || !loginStrategy){
            throw new CustomError(ERROR_MESSAGES.INVALID_ROLE,HTTP_STATUS.FORBIDDEN)
        }

         const ticket  =  await this.client.verifyIdToken({
            idToken:credential,
            audience:client_id,

        })

        const payload = ticket.getPayload() 

        if(!payload){
            throw new CustomError(ERROR_MESSAGES.PAYLAOD_NOT_FOUND,HTTP_STATUS.UNAUTHORIZED)
        }
        
        const googleId = payload.sub
        const email = payload.email
        const name = payload.given_name
        const profileImage = payload.picture    


        if(!email){
            throw new CustomError(ERROR_MESSAGES.EMAIL_REQUIRED,HTTP_STATUS.BAD_REQUEST)
        }

        const existingUser = await loginStrategy.login({email,role})

       if(role=="client"){
        
         if(!existingUser){
            const newUser = await registerStrategy.register({
                name:name as string,
                role,
                googleId,
                email,
                profileImage

            });

          await this.emailService.sendEmail(
            email,
            "🎉 Welcome to Eventora – You're All Set!",
            GOOGLE_LOGIN_SUCCESS_MESSAGE(name as string)
          )

            if(!newUser){
                throw new CustomError("",0)
            }
            return {email,role,_id:newUser._id,name:newUser.name}
        }
       }
        return {email,role,_id:existingUser._id,name:existingUser.name || ""}
    }
}