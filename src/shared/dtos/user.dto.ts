import { TRole } from "@shared/constants";
import { ObjectId } from "mongoose";




export type clientStatus = "active" | "blocked"

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

export interface ClientTableDTO {
    _id:string,
    clientId?:string,
    name:string,
    email:string,
    phone:string,
    profileImage?:string,
    status:clientStatus
}


export interface RequestedVendorTableDTO{
    _id:string,
    name:string,
    email:string,
    vendorStatus:string,
    idProof:string
}

export interface VendorDTO{
    vendorId?:string,
    name:string,
    email:string,
    phone?:string,
    profileImage?:string,
    password?:string,
    idProof:string,
    role:"vendor",
   
}


export interface CategoryDTO{
    _id?:string | ObjectId
    categoryId?:string
    title:string,
    image:string,
    status?:string,
}

export interface EventDTO{
    eventId?:string,
    status?:string
    title:string;
    pricePerTicket:number;
    eventLocation:string;
    attendiesCount?:number
    images:string,
 eventSchedule: {
    date: Date;
    startTime: string;
    endTime: string;
  }[];
}

export type UserDTO = AdminDTO | ClientDTO | VendorDTO


export interface LoginUserDTO{
    email:string,
    password?:string,
    role:TRole,
}

export interface LoginVendorDTO{
    VendorId:string,
    vendorStatus: "pending" | "approved" | "rejected" | "verifying"
    rejectReason?:string
    bio?:string
}