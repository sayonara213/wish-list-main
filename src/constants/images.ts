import heart from '@/assets/icons/heart.png';
import logo from '@/assets/icons/logo.svg';
import star from '@/assets/icons/star.png';

export const IMAGES = {
  logo,
  star,
  heart,
};

export type TImage = keyof typeof IMAGES;
