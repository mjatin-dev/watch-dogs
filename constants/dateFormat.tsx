export function convertTimestampToDate(timestamp: any) {
  const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
  const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if necessary
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (+1 as it's zero-based) and pad with leading zero if necessary
  const year = date.getFullYear().toString(); // Get full year

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}
