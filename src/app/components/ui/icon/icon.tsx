import { IMAGES } from '@/app/constants/images';
import Image from 'next/image';
import React from 'react';
import { ITextProps } from '../text/text';
import styles from '@/app/components/ui/text/text.module.scss';

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
    <Image src={IMAGES.logo} alt='Logo' width={24} height={24} priority objectFit='cover' />
  ) : (
    <span
      style={{ fontSize: size }}
      className={`${styles[color]} material-icons-outlined leading-none`}
    >
      {name}
    </span>
  );
};
