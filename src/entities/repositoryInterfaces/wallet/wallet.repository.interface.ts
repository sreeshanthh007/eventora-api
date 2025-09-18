


export interface walletDetails {
    balance:number
    walletId:string
    userType:string
    userId:string
}
export interface IWalletRepository {
    createWallet(walletDetails:walletDetails) : Promise<void>
}