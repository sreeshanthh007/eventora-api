

export interface ICloudinarySignatureService{
    generateSignature(folder:string):{
        timestamp:number;
        signature:string;
        folder:string;
        apiKey:string;
        cloudName:string
    }
}

