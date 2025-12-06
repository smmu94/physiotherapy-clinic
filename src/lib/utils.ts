export function formatDate(date: string | Date, locale: string) {
  const d = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}