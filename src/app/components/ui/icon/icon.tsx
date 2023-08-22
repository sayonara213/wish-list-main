import { IMAGES } from '@/app/constants/images';
import Image from 'next/image';
import React from 'react';

interface IIconProps extends React.HTMLAttributes<HTMLParagraphElement> {
  name?: string;
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  color?: 'primary' | 'secondary';
  logo?: boolean;
  classes?: string;
}

const colors = {
  primary: 'text-black dark:text-white',
  secondary: 'text-gray-500 dark:text-gray-400',
};

export const Icon: React.FC<IIconProps> = ({
  name = 'home',
  size = '2xl',
  color = 'primary',
  logo = false,
  classes,
}) => {
  return logo ? (
    <Image src={IMAGES.logo} alt='Logo' width={24} height={24} priority objectFit='cover' />
  ) : (
    <span
      className={`text-${size} ${colors[color]} ${classes} material-icons-outlined leading-none`}
    >
      {name}
    </span>
  );
};
