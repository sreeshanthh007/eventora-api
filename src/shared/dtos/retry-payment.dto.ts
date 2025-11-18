

export interface RetryPaymentDTO {
  ticketId: string;
  vendorId: string;
  ticketType?: string;
  pricePerTicket?: number;
  quantity?: number;
}