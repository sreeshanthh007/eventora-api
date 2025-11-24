import { IUUIDGeneratorService } from "@entities/serviceInterfaces/generate-random-uuid.interface";
import { randomUUID } from "crypto";


export class UUIDGeneratorService implements IUUIDGeneratorService{
    generate(): string {
        return `EVT-${randomUUID()}`;
    }
}