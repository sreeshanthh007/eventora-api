import { IBcryptService } from "@entities/serviceInterfaces/bcrypt-service.interface";
import bcrypt from "bcrypt";

export class BcryptService implements IBcryptService{

    async hash(original: string): Promise<string> {
        
        return await bcrypt.hash(original,10)
    }

    async compare(current: string, original: string): Promise<boolean> {
        return await bcrypt.compare(current,original)
    }
}