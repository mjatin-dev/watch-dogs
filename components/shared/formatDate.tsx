import moment from "moment";
export function getTimeDiffFromNow(dateString: Date) {
  const now = moment();
  const date = moment(dateString);

  const diffInMs = now.diff(date);

  const diffInSec = Math.floor(diffInMs / 1000);
  if (diffInSec < 60) {
    return `${diffInSec} seconds ago`;
  }

  const diffInMin = Math.floor(diffInSec / 60);
  if (diffInMin < 60) {
    return `${diffInMin} minutes ago`;
  }

  const diffInHrs = Math.floor(diffInMin / 60);
  if (diffInHrs < 24) {
    return `${diffInHrs} hours ago`;
  }

  const diffInDays = Math.floor(diffInHrs / 24);
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} weeks ago`;
  }

  const diffInMonths = now.diff(date, "months");
  if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  }

  const diffInYears = now.diff(date, "years");
  return `${diffInYears} years ago`;
}
