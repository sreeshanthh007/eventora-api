import { IClientEntity } from "@entities/models/client.entity";
import { IUserEntity } from "@entities/models/user.entity"
import { ClientResponseDTO, clientStatus, ClientTableDTO } from "@shared/dtos/user.dto"

export  function mapClientAndVendorEntityToTableRow (client:IUserEntity) : ClientTableDTO {
    return {
        _id:client._id.toString(),
        name:client.name,
        email:client.email,
        phone:client.phone,
        status:(client.status =="blocked" ? "blocked" : "active") as clientStatus
    }
}




export function mapClientDetailsViaGoogleLogin(client:IUserEntity) : ClientResponseDTO{
    return {
        name:client.name,
        email:client.email,
        phone:client.phone,
        role:"client",
        profileImage:client.profileImage,
        _id:client._id.toString(),
    }
}



export function mapClientToDTO(client: IClientEntity): ClientResponseDTO {
  return {
    _id: client._id.toString(),
    clientId: client._id.toString(),
    name: client.name,
    email: client.email,
    phone: client.phone,
    role: "client",
    profileImage: client.profileImage
  };
}