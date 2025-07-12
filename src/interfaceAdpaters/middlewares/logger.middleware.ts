import { ILogger } from "interfaceAdpaters/services/logger/logger.interface";
import { Request , Response, NextFunction } from "express";
import { inject , injectable } from "tsyringe";

@injectable()
export class LoggerMiddleWare {
    constructor(
        @inject("ILogger") private logger : ILogger
    ){}

    public handle(req:Request , res:Response , next:NextFunction) : void{
        this.logger.info("In Logger =>",{
            ip:req.ip,
            timestamp:new Date().toISOString()
        });
        next()
    }
}