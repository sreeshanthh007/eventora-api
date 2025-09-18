import { IQrCodeService } from "@entities/serviceInterfaces/qr-code-service.interface";

import QRCode  from "qrcode";

export class QrCodeService implements IQrCodeService{

    async generateQrCode(data: string): Promise<string> {
        
        return await   QRCode.toDataURL(data)
    }
}