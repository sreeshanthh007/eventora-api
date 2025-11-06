


export interface AdminAnalyticsResponseDTO {
  data: {
    overview: OverviewAnalyticsDTO
    revenue: RevenueAnalyticsDTO
    vendorStats: VendorAnalyticsDTO
    clientStats: ClientAnalyticsDTO
    categoryInsights: CategoryAnalyticsDTO[]
  }
}

export interface OverviewAnalyticsDTO {
  totalClients: number
  totalVendors: number
  verifiedVendors: number
  blockedVendors: number
  totalCategories: number
  totalRevenue: number

}

export interface RevenueAnalyticsDTO {
  totalRevenue: number
  chartData: {
    date: string
    revenue: number
  }[]
}

export interface VendorAnalyticsDTO {
  totalVendors: number
  verifiedVendors: number
  unverifiedVendors: number
  activeVendors: number
  blockedVendors: number
  topVendors: {
    name: string
    revenue: number
    percentage: string | number
    profilePicture:string
  }[]
}

export interface ClientAnalyticsDTO {
  totalClients: number
  activeClients: number
  blockedClients: number
}

export interface CategoryAnalyticsDTO {
  categoryName: string
  revenue: number
  percentageOfTotal: number
  growth: string // e.g., "+12%" or "-5%"
}