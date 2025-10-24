

export interface TicketItemDTO {
  ticketType: string;
  pricePerTicket: number;
  quantity: number;
}

export interface BookingCreationDTO {
  eventId: string;
  currency: string;
  totalAmount: number;
  tickets: TicketItemDTO[];
}

