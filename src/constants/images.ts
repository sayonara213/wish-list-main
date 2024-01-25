import heart from '@/assets/icons/heart.png';
import logo from '@/assets/icons/logo.svg';
import star from '@/assets/icons/star.png';
import emptyPresent from '@/assets/images/empty-present.svg';
import google from '@/assets/icons/google.png';
import discord from '@/assets/icons/discord.png';

export const IMAGES = {
  logo,
  star,
  heart,
  emptyPresent,
  google,
  discord,
};

export type TImage = keyof typeof IMAGES;
