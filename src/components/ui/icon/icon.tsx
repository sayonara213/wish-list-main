import React from 'react';

import Image from 'next/image';

import styles from '@/components/ui/text/text.module.scss';
import { IMAGES } from '@/constants/images';

interface IIconProps extends React.HTMLAttributes<HTMLParagraphElement> {
  name?: string;
  logo?: boolean;
  size?: number;
  color?: 'link' | 'default' | 'muted' | 'white' | 'secondary';
  className?: string;
}

export const Icon: React.FC<IIconProps> = ({
  name = 'home',
  size = 16,
  color = 'default',
  logo = false,
  onClick,
  className,
}) => {
  return logo ? (
    <Image src={IMAGES.logo} alt='Logo' width={24} height={24} priority />
  ) : (
    <span
      style={{ fontSize: `${size}px`, cursor: onClick && 'pointer' }}
      className={`${styles[color]} material-icons-outlined leading-none ${className}`}
      onClick={onClick}
    >
      {name}
    </span>
  );
};
