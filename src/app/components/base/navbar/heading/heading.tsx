import { Icon } from '@/app/components/ui/icon/icon';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import React from 'react';

interface IHeadingProps {
  variants: Variants;
  isExpanded: boolean;
  toggleNav: () => void;
}

export const Heading: React.FC<IHeadingProps> = ({ variants, isExpanded, toggleNav }) => {
  return (
    <div className='relative mb-10'>
      <button
        onClick={toggleNav}
        className={`border-subAccentLight bg-accentLight absolute -right-[30px] top-1 flex items-center justify-center rounded-full border-4 border-solid transition-transform duration-500 ease-out dark:border-subAccent dark:bg-accent ${
          !isExpanded && 'rotate-180'
        }`}
      >
        <Icon name='arrow_left' color='secondary' />
      </button>
      <div className='mb-4 box-content flex h-[24px] select-none items-center space-x-2 rounded-md p-2'>
        <Icon logo />
        <AnimatePresence>
          {isExpanded && (
            <motion.span initial='hide' animate='show' exit='hide' variants={variants}>
              <h1 className='text-3xl font-bold text-black dark:text-white '>Wishy</h1>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
