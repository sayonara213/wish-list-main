import { Icon } from '@/app/components/ui/icon/icon';
import { toNormalCase } from '@/app/services/text';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import React from 'react';
import { NavbarSubItem } from './navbar-sub-item/navbar-sub-item';
import './navbar-item.css';

interface INavbarItemProps {
  name: string;
  icon: string;
  link?: string;
  onClick?: () => void;
  isExpanded: boolean;
  variants: Variants;
}

const liVariants = {
  show: {
    opacity: 1,
    marginTop: '8px',
    marginLeft: '10px',
    height: 'auto',
    transition: { duration: 0.3, delay: 0.4, ease: 'easeInOut' },
  },
  hide: {
    opacity: 0,
    height: '0px',
    marginTop: '0px',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

export const NavbarItem: React.FC<INavbarItemProps> = ({
  name,
  icon,
  link,
  onClick,
  isExpanded,
  variants,
}) => {
  const click = () => {
    onClick && onClick();
  };

  return (
    <li className='mb-4 flex-col'>
      <div
        className={`box-content flex h-[24px] cursor-pointer select-none items-center space-x-2 rounded-md p-2 transition-colors duration-150 ease-in-out ${
          onClick && 'hover:bg-primary-500'
        }`}
      >
        <Icon name={icon} className='5ms transition-all' />
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              initial='hide'
              animate='show'
              exit='hide'
              variants={variants}
              transition={{ duration: 0.3, delay: 0.15 }}
              className='w-full overflow-hidden whitespace-nowrap'
            >
              <p className='text-xl font-bold text-black dark:text-white'>{toNormalCase(name)}</p>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {name === 'profile' && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial='hide'
              animate='show'
              exit='hide'
              variants={liVariants}
              className='border-l-borderLight scroll scrollbar-thumb-primary-500 flex max-h-[140px] flex-col items-start gap-2 overflow-y-scroll border-l-2 px-4 dark:border-border'
            >
              <NavbarSubItem name='Firt wishlist' />
              <NavbarSubItem name='Second wishlist' />
              <NavbarSubItem name='Third wishlist' />
              <NavbarSubItem name='Third wishlist' />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </li>
  );
};
