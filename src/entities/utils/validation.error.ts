import { HTTP_STATUS } from "@shared/constants";
import { CustomError } from "./custom.error";
import { TError } from "@shared/types/error.type";


export class ValidationError extends CustomError {
    constructor(message:string,public errors?:TError){
        super(message,HTTP_STATUS.BAD_REQUEST)
        this.name="validationError"
    }
}