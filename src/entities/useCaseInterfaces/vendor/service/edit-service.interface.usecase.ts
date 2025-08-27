import { IServiceEntity } from "@entities/models/service.entity";

export type EditableServiceFields = Partial<
  Pick<
    IServiceEntity,
    | "additionalHourPrice"
    | "cancellationPolicies"
    | "serviceDescription"
    | "serviceDuration"
    | "servicePrice"
    | "categoryId"
    | "serviceTitle"
    | "termsAndConditions"
    | "yearsOfExperience"
  >
>;

export interface IEditServiceUseCase {
  execute(vendorId:string,serviceId: string, data: EditableServiceFields): Promise<void>;
}