import { TRole } from "@shared/constants";

export interface AdminDTO {
    email:string,
    password:string,
    role:"admin"
}


export interface ClientDTO{
    clientId?:string,
    name:string,
    email:string,
    phone?:string,
    profileImage?:string,
    googleId?:string,
    password?:string,
    role:"client"
}


export interface VendorDTO{
    vendorId?:string,
    name:string,
    email:string,
    phone?:string,
    profileImage?:string,
    googleId?:string,
    password?:string,
    role:"vendor"
}


export type UserDTO = AdminDTO | ClientDTO | VendorDTO


export interface LoginUserDTO{
    email:string,
    password:string,
    role:TRole
}