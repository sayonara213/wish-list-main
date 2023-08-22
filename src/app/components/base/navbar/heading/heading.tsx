import { Icon } from '@/app/components/ui/icon/icon';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import React from 'react';
import styles from './heading.module.scss';
import { Paragraph } from '@/app/components/ui/text/text';

interface IHeadingProps {
  variants: Variants;
  isExpanded: boolean;
  toggleNav: () => void;
}

export const Heading: React.FC<IHeadingProps> = ({ variants, isExpanded, toggleNav }) => {
  return (
    <div className={styles.heading}>
      <button onClick={toggleNav} className={isExpanded ? styles.rotate : ''}>
        <Icon name='arrow_left' color='muted' />
      </button>
      <div className={styles.wrapper}>
        <Icon logo />
        <AnimatePresence>
          {isExpanded && (
            <motion.span initial='hide' animate='show' exit='hide' variants={variants}>
              <Paragraph size='lg' weight='bold'>
                Wishy
              </Paragraph>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
