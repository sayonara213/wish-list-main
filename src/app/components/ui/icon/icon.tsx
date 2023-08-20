import { IMAGES } from '@/app/constants/images';
import Image from 'next/image';
import React from 'react';

interface IIconProps extends React.HTMLAttributes<HTMLParagraphElement> {
  name?: string;
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  color?: 'primary' | 'secondary';
  logo?: boolean;
}

const colors = {
  primary: 'text-black dark:text-white',
  secondary: 'text-gray-500 dark:text-gray-400',
};

export const Icon: React.FC<IIconProps> = ({
  name = 'home',
  size = '4xl',
  color = 'primary',
  logo = false,
}) => {
  return logo ? (
    <Image src={IMAGES.logo} alt='Logo' width={32} height={32} priority />
  ) : (
    <span className={`text-${size} ${colors[color]} material-icons-round leading-none`}>
      {name}
    </span>
  );
};
