import { formatDistanceToNow } from 'date-fns';

const convertUTCDateToLocalDate = (date: string) => {
  const dateObj = new Date(date);

  var newDate = new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60 * 1000);

  const offset = dateObj.getTimezoneOffset() / 60;
  const hours = dateObj.getHours();

  newDate.setHours(hours - offset);

  return newDate;
};

export const formatDateToNow = (date: string) => {
  const utcDate = convertUTCDateToLocalDate(date);

  return formatDistanceToNow(utcDate, { addSuffix: true });
};
