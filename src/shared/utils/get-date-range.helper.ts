

export function getDateRange(period: string, startDate?: Date, endDate?: Date) {
  const now = new Date()
  let start: Date
  let end: Date

  switch (period) {
    case "today": {
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)
      break
    }

    case "week": {
      const firstDayOfWeek = new Date(now)
      firstDayOfWeek.setDate(now.getDate() - now.getDay())
      start = new Date(firstDayOfWeek.setHours(0, 0, 0, 0))
      end = new Date(now.setHours(23, 59, 59, 999))
      break
    }

    case "month": {
      start = new Date(now.getFullYear(), now.getMonth(), 1)
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
      break
    }

    case "year": {
      start = new Date(now.getFullYear(), 0, 1)
      end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999)
      break
    }

    case "custom": {
      start = startDate ?? new Date()
      end = endDate ?? new Date()
      break
    }

    default: {
      start = new Date(now.getFullYear(), now.getMonth(), 1)
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
      break
    }
  }

  return { start, end }
}
