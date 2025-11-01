import { IServiceEntity } from "@entities/models/service.entity";


export type EditableScheduleFields = Partial<{
  frequency: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  workingDays?: number[];
  holidays?: string[];
}>;


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
  > & {
    schedule?: EditableScheduleFields; 
  }
>;

export interface IEditServiceUseCase {
  execute(serviceId: string, data: EditableServiceFields): Promise<void>;
}