import { IBcrypt } from "./bcrypt.interface";
import bcrypt from  "bcrypt"
import { injectable } from "tsyringe";

@injectable()
export class passwordBcrypt implements IBcrypt{

    async hash(original: string): Promise<string> {
        return await bcrypt.hash(original,10)
    }

    async compare(current: string, original: string): Promise<boolean> {
        return await bcrypt.compare(current,original)
    }
}