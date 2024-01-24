import React from 'react';

import styles from './heading.module.scss';

import { Icon } from '@/components/ui/icon/icon';

import { AnimatePresence, Variants, motion } from 'framer-motion';
import { Text } from '@mantine/core';

interface IHeadingProps {
  isExpanded: boolean;
  toggleNav: () => void;
}

const textVariants: Variants = {
  show: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.1 } },
  hide: { opacity: 0, x: -30, transition: { duration: 0.3 } },
};

export const Heading: React.FC<IHeadingProps> = ({ isExpanded, toggleNav }) => {
  return (
    <div className={styles.heading}>
      <button onClick={toggleNav} className={isExpanded ? '' : styles.rotate}>
        <Icon name='arrow_left' color='white' size={20} />
      </button>
      <div className={styles.wrapper}>
        <Icon logo />
        <AnimatePresence>
          {isExpanded && (
            <motion.div initial='hide' animate='show' exit='hide' variants={textVariants}>
              <Text size='xxl' fw='bold' c='white'>
                Wishy
              </Text>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
