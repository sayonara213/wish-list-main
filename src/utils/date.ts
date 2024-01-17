import { formatDistanceToNow } from 'date-fns';

export const formatDateToNow = (date: string) => {
  const dateObj = new Date(date);

  return formatDistanceToNow(dateObj, { addSuffix: true });
};

export const formatBirthdayToNow = (date: string) => {
  const dateObj = new Date(date);

  dateObj.setFullYear(new Date().getFullYear());

  return formatDistanceToNow(dateObj, { addSuffix: true });
};
