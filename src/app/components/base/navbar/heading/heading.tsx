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
    <div className='relative mb-10 flex items-center'>
      <div className='flex items-center gap-3'>
        <Icon logo />
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              initial='hide'
              animate='show'
              exit='hide'
              variants={variants}
              transition={{ duration: 0.3 }}
            >
              <h1 className='text-white text-3xl font-bold'>Wishy</h1>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <button
        onClick={toggleNav}
        className={`50ms absolute right-0 flex items-center justify-center transition-all ${
          !isExpanded && 'right-[-75%]'
        }`}
      >
        {isExpanded ? (
          <Icon name='menu_open' color='secondary' />
        ) : (
          <Icon name='menu' color='secondary' />
        )}
      </button>
    </div>
  );
};
