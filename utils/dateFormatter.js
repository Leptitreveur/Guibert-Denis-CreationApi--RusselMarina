/**
 * Date formatting utilities
 *
 * Provides functions to format, parse and manipulate dates in UTC timezone.
 * Used for consistent date handling in reservation management.
 */

/**
 * Get the start of the day in UTC
 *
 * Returns a Date object representing the start of the day (00:00:00.000) in UTC
 * for the given time.
 *
 * @function startOfDayUTC
 * @param {Date} startDate - Date object to get the start of the day from
 * @returns {Date} Date object representing the start of the day in UTC
 */
export function startOfDayUTC(startDate) {
  return new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate(), 0, 0, 0, 0));
}

/**
 * Get the end of the day in UTC
 *
 * Returns a Date object representing the end of the day (23:59:59.999) in UTC
 * for the given time.
 *
 * @function endOfDayUTC
 * @param {Date} endDate - Date object to get the end of the day in UTC
 * @returns {Date} Date object representing the end of the day in UTC
 */
export function endOfDayUTC(endDate) {
  return new Date(Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate(), 23, 59, 59, 999));
}

/**
 * Parse an ISO date string (YYYY-MM-DD) to a UTC Date object
 *
 * Parses a date string in ISO format (YYYY-MM-DD) and returns a Date object in UTC.
 * Returns null if the date string is invalid or the date doesn't exist.
 *
 * @function parseIsoDateUTC
 * @param {string} iso - ISO date string in format YYYY-MM-DD
 * @returns {Date|null} Date object in UTC or null if invalid
 */
export function parseIsoDateUTC(iso) {
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
}

/**
 * Converts a Date object in UTC format to an ISO date string (YYYY-MM-DD)
 *
 * Formats a Date object format in UTC format and retunrs an ISO date string (YYYY-MM-DD).
 *
 * @function formatUTCDateToISO
 * @param {Date} date - Date object in UTC to format
 * @returns {string} Iso date string in format YYYY-MM-DD
 */
export function formatUTCDateToISO(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
