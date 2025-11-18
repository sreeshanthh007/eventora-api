

import { RequestedVendorTableDTO } from "@shared/dtos/user.dto";


export interface PaginatedVendors {
    vendors:RequestedVendorTableDTO[] | [],
    total:number
}