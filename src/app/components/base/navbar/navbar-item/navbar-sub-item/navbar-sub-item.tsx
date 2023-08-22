import { toNormalCase } from '@/app/services/text';
import React from 'react';

interface INavbarSubItemProps {
  name: string;
  link?: string;
}

export const NavbarSubItem: React.FC<INavbarSubItemProps> = ({ name, link }) => {
  return (
    <button className='h-10 rounded-full px-5 py-2 text-base font-semibold text-subText transition-colors duration-150 ease-in-out hover:bg-primary-500 hover:text-white'>
      {toNormalCase(name)}
    </button>
  );
};
