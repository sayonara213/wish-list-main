import React from 'react';

import Image from 'next/image';

interface IAvatarProps {
  src: string;
  size: number;
}

export const Avatar: React.FC<IAvatarProps> = ({ src, size = 24 }) => {
  return (
    <Image
      src={src}
      width={size}
      height={size}
      alt={'avatar'}
      style={{ borderRadius: '50%', objectFit: 'cover' }}
    />
  );
};
