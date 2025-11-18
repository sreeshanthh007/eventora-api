
import { ClientTableDTO } from "@shared/dtos/user.dto";


export interface PaginatedUsers {
  user: ClientTableDTO[]  | [];
  total: number;
}