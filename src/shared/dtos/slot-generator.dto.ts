

export interface ISlotGenerationDTO {
  frequency: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | "ONCE";
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  workingDays?: number[];
  holidays?: string[];
}

export interface SlotGenerationResponse{
    date:string
    slots:string[]
}