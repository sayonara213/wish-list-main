import React from 'react';

import Image from 'next/image';

import { IMAGES, TImage } from '@/constants/images';

interface IIconProps extends React.HTMLAttributes<HTMLImageElement> {
  name: TImage;
  size?: number;
}

export const CustomIcon: React.FC<IIconProps> = ({ name, size = 16, onClick }) => {
  return (
    <Image
      src={IMAGES[name]}
      alt='icon'
      width={size}
      height={size}
      priority
      onClick={onClick}
      style={onClick && { cursor: 'pointer' }}
    />
  );
};
