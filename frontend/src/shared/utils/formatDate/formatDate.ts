export function formatDate(date: string | undefined) {
  if (!date) {
    return ''
  }

  const d = new Date(date)
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

  return `${day}-${month}-${year}`
}
