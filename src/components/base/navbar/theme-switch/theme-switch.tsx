'use client';

import styles from './theme-switch.module.scss';

import { Icon } from '@/components/ui/icon/icon';
import { Paragraph } from '@/components/ui/text/text';
import { classes } from '@/utils/styles';

import { useMantineColorScheme } from '@mantine/core';
import { AnimatePresence, Variants, motion } from 'framer-motion';

interface IThemeSwitchProps {
  variants?: Variants;
  isExpanded?: boolean;
}

export const ThemeSwitch: React.FC<IThemeSwitchProps> = ({ variants, isExpanded }) => {
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <li className={classes(styles.wrapper, styles.button)}>
      <div className={styles.icon} onClick={toggleColorScheme}>
        <Icon name='dark_mode' size={24} />
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial='hide'
              animate='show'
              exit='hide'
              variants={variants}
              transition={{ duration: 0.3, delay: 0.15 }}
              className={styles.span}
            >
              <Paragraph weight='medium'>Switch theme</Paragraph>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className={styles.icon} onClick={toggleColorScheme}>
        <Icon name='light_mode' size={24} />
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial='hide'
              animate='show'
              exit='hide'
              variants={variants}
              transition={{ duration: 0.3, delay: 0.15 }}
              className={styles.span}
            >
              <Paragraph weight='medium'>Switch theme</Paragraph>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
};
