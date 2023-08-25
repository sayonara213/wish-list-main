import React from 'react';

import styles from './heading.module.scss';

import { Icon } from '@/components/ui/icon/icon';
import { Paragraph } from '@/components/ui/text/text';

import { AnimatePresence, Variants, motion } from 'framer-motion';

interface IHeadingProps {
  variants: Variants;
  isExpanded: boolean;
  toggleNav: () => void;
}

export const Heading: React.FC<IHeadingProps> = ({ variants, isExpanded, toggleNav }) => {
  return (
    <div className={styles.heading}>
      <button onClick={toggleNav} className={isExpanded ? '' : styles.rotate}>
        <Icon name='arrow_left' color='muted' />
      </button>
      <div className={styles.wrapper}>
        <Icon logo />
        <AnimatePresence>
          {isExpanded && (
            <motion.div initial='hide' animate='show' exit='hide' variants={variants}>
              <Paragraph size='lg' weight='bold'>
                Wishy
              </Paragraph>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
