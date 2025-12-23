import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { IGetAllServicesofVendorsForAdminUseCase } from "@entities/useCaseInterfaces/admin/get-all-service-vendors-admin.usecase.interface";
import {  mapServiceToTableResponseForAdmin } from "@mappers/serviceMapper";
import { PAGINATION } from "@shared/constants";
import { PaginatedServicesofVendorsForAdmin } from "interfaceAdapters/models/paginatedService";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetAllServicesofVendorsForAdminUseCase implements IGetAllServicesofVendorsForAdminUseCase{
  
  constructor(
    @inject("IServiceRepository") private _seviceRepo : IServiceRepository
  ){}
  
  
  async execute(page: number, limit: number, search: string,filterBy:string): Promise<PaginatedServicesofVendorsForAdmin> {
      
      const safePage = Math.max(
        PAGINATION.PAGE,
        page || PAGINATION.PAGE
      );
      
      const safeLimit = Math.min(
        PAGINATION.MAX_LIMIT,
        Math.max(1,limit || PAGINATION.LIMIT)
      );
      
      const skip = (safePage - 1) * safeLimit
      
      const {services,total} = await this._seviceRepo.findServicesofVendorsForAdmin(skip,limit,search,filterBy);
      
      const mappedService = services.map(mapServiceToTableResponseForAdmin);
      
      return {
        services:mappedService,
        total:Math.ceil(total/limit)
      }
  }
}