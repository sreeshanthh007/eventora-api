




export interface VendorAnalyticsDashboardResponseDTO {
  data: {
    overview: OverviewAnalyticsDTO
    revenue: RevenueAnalyticsDTO
    servicePerformance: ServicePerformanceDTO[]
    bookingAnalytics: BookingAnalyticsDTO
    eventAnalytics: EventAnalyticsDTO
    ratingInsights: RatingAnalyticsDTO
  }
}


export interface OverviewAnalyticsDTO {
  totalRevenue: number
  totalBookings: number
  upcomingBookings: number
  totalEvents: number
  upcomingEvents: number
  averageRating: number
}

export interface RevenueAnalyticsDTO {
  totalRevenue: number
  chartData: {
    date: Date
    revenue: number
  }[]
}

export interface ServicePerformanceDTO {
  serviceTitle: string
  totalBookings: number
  revenue: number
  averageRating: number
  status: "active" | "blocked"
}

export interface BookingAnalyticsDTO {
  completed: number
  ongoing: number
  cancelled: number
  pending: number
}

export interface EventAnalyticsDTO {
  totalEvents: number
  upcomingEvents: number
  completedEvents: number
  cancelledEvents: number
  totalTicketsSold: number
  totalEventRevenue: number
}

export interface RatingAnalyticsDTO {
  average: number
  totalReviews: number
  distribution: {
    "5": number
    "4": number
    "3": number
    "2": number
    "1": number
  }
}