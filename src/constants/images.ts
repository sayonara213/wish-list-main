import heart from '@/assets/icons/heart.png';
import logo from '@/assets/icons/logo.svg';
import star from '@/assets/icons/star.png';
import emptyPresent from '@/assets/images/empty-present.svg';

export const IMAGES = {
  logo,
  star,
  heart,
  emptyPresent,
};

export type TImage = keyof typeof IMAGES;
