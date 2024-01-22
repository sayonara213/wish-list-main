'use client';

import styles from './theme-switch.module.scss';

import { Icon } from '@/components/ui/icon/icon';
import { classes } from '@/utils/styles';

import { Text, useMantineColorScheme } from '@mantine/core';
import { AnimatePresence, Variants, motion } from 'framer-motion';

interface IThemeSwitchProps {
  isExpanded?: boolean;
}

const textVariants: Variants = {
  show: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.1 } },
  hide: { opacity: 0, x: -30, transition: { duration: 0.3 } },
};

export const ThemeSwitch: React.FC<IThemeSwitchProps> = ({ isExpanded }) => {
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <li className={classes(styles.wrapper, styles.button)}>
      <div className={styles.icon} onClick={toggleColorScheme}>
        <>
          <Icon name='dark_mode' size={24} color='white' />
          <Icon name='light_mode' size={24} color='white' />
        </>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial='hide'
              animate='show'
              exit='hide'
              variants={textVariants}
              transition={{ duration: 0.3, delay: 0.15 }}
              className={styles.span}
            >
              <Text fw='bold' c='white'>
                Switch theme
              </Text>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
};
