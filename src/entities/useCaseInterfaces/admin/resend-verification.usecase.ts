

export interface IResendVerificationUseCase {
    execute(vendorId:string) : Promise<void>
}