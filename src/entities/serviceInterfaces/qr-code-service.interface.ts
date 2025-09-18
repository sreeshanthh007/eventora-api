
export interface IQrCodeService {
    generateQrCode(data:string) : Promise<string>
}