/**
 * Calculates years of experience from a start date.
 * Returns a whole number if exact, or a number with a "+" suffix if between years.
 */
export const formatExperience = (startDate: string | Date): string => {
  const start = new Date(startDate);
  const now = new Date();

  // Validate date
  if (isNaN(start.getTime())) return "0";

  let years = now.getFullYear() - start.getFullYear();
  const monthDiff = now.getMonth() - start.getMonth();
  const dayDiff = now.getDate() - start.getDate();

  // Adjust years down if the anniversary hasn't happened yet this year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    years--;
  }

  // It is exact only if both month and day match perfectly
  const isExactAnniversary = monthDiff === 0 && dayDiff === 0;

  if (years <= 0) return "0";

  return isExactAnniversary ? `${years}` : `${years}+`;
};
