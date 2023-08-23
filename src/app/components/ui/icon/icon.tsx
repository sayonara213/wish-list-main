import React from 'react';

import Image from 'next/image';

import styles from '@/app/components/ui/text/text.module.scss';
import { IMAGES } from '@/app/constants/images';

import { ITextProps } from '../text/text';

interface IIconProps extends React.HTMLAttributes<HTMLParagraphElement> {
  name?: string;
  logo?: boolean;
  size?: number;
  color?: ITextProps['color'];
}

export const Icon: React.FC<IIconProps> = ({
  name = 'home',
  size = '24px',
  color = 'default',
  logo = false,
  ...props
}) => {
  return logo ? (
    <Image src={IMAGES.logo} alt='Logo' width={24} height={24} priority />
  ) : (
    <span
      style={{ fontSize: size }}
      className={`${styles[color]} material-icons-outlined leading-none`}
    >
      {name}
    </span>
  );
};
