import { IUserEntity } from "@entities/models/user.entity"
import { clientStatus, ClientTableDTO } from "@shared/dtos/user.dto"

export  function mapClientAndVendorEntityToTableRow (client:IUserEntity) : ClientTableDTO {
    return {
        _id:client._id.toString(),
        name:client.name,
        email:client.email,
        phone:client.phone,
        status:(client.status =="blocked" ? "blocked" : "active") as clientStatus
    }
}