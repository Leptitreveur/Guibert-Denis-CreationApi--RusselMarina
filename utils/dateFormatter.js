export const startOfDayUTC = (startDate) => {
  return new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate(), 0, 0, 0, 0));
};

export const endOfDayUTC = (endDate) => {
  return new Date(Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate(), 23, 59, 59, 999));
};

export const parseIsoDateUTC = (iso) => {
  const date = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/.exec(iso);

  if (!date) return null;

  const year = Number(date.groups.year);
  const month = Number(date.groups.month);
  const day = Number(date.groups.day);
  const newDate = new Date(Date.UTC(year, month - 1, day));

  if (newDate.getUTCFullYear() !== year || newDate.getUTCMonth() !== month - 1 || newDate.getUTCDate() !== day) {
    return null;
  }
  return newDate;
};

export function formatDateOnly(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
