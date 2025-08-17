
import { v2 as cloudinary } from "cloudinary";
import { injectable } from "tsyringe";
import { config } from "@shared/config";
import { ICloudinarySignatureService } from "@entities/serviceInterfaces/cloudinary-service.interface";


if(
    !config.cloudinary.apiKey ||
    !config.cloudinary.apiSecret ||
    !config.cloudinary.cloudName
){
    throw new Error("Cloudinary env has some missings in config file")
}


cloudinary.config({
    cloud_name:config.cloudinary.cloudName,
    api_key:config.cloudinary.apiKey,
    api_secret:config.cloudinary.apiSecret
});


@injectable()

export class CloudinarySignatureService implements ICloudinarySignatureService{
    generateSignature(folder: string): { timestamp: number; signature: string; folder: string; apiKey: string; cloudName: string; } {
        
        const timestamp = Math.floor(Date.now()/1000)

        const signature = cloudinary.utils.api_sign_request(
            {timestamp,folder},
            config.cloudinary.apiSecret!
        );  

        return {
            timestamp,
            signature,
            folder,
            apiKey:config.cloudinary.apiKey!,
            cloudName:config.cloudinary.cloudName!
        } 
    }
}