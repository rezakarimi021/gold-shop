const PERSIAN_DATE_FORMATTER = new Intl.DateTimeFormat("fa-IR", {
  calendar: "persian",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const PERSIAN_SHORT_FORMATTER = new Intl.DateTimeFormat("fa-IR", {
  calendar: "persian",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const PERSIAN_TIME_FORMATTER = new Intl.DateTimeFormat("fa-IR", {
  calendar: "persian",
  hour: "2-digit",
  minute: "2-digit",
});

export const formatDate = (dateString: string): string =>
  PERSIAN_DATE_FORMATTER.format(new Date(dateString));

export const formatDateShort = (dateString: string): string =>
  PERSIAN_SHORT_FORMATTER.format(new Date(dateString));

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return `${PERSIAN_DATE_FORMATTER.format(date)} ساعت ${PERSIAN_TIME_FORMATTER.format(date)}`;
};

export const formatRelativeTime = (dateString: string): string => {
  const now = Date.now();
  const date = new Date(dateString).getTime();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "امروز";
  if (diffDays === 1) return "دیروز";
  if (diffDays < 7) return `${new Intl.NumberFormat("fa-IR").format(diffDays)} روز پیش`;
  if (diffDays < 30)
    return `${new Intl.NumberFormat("fa-IR").format(Math.floor(diffDays / 7))} هفته پیش`;
  return formatDate(dateString);
};
