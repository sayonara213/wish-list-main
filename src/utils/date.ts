import { formatDistanceToNow } from 'date-fns';

export const formatDateToNow = (date: string) => {
  const dateObj = new Date(date);

  return formatDistanceToNow(dateObj, { addSuffix: true });
};
