'use client';

import styles from './theme-switch.module.scss';

import { NavbarItem } from '../navbar-item/navbar-item';

import { Icon } from '@/components/ui/icon/icon';
import { Paragraph } from '@/components/ui/text/text';
import { classes } from '@/utils/styles';

import { Switch, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { AnimatePresence, Variants, motion } from 'framer-motion';

interface IThemeSwitchProps {
  variants?: Variants;
  isExpanded?: boolean;
}

const iconVariants: Variants = {
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'backInOut' } },
  hide: { opacity: 0, x: -30, transition: { duration: 0.3, ease: 'backInOut' } },
};

export const ThemeSwitch: React.FC<IThemeSwitchProps> = ({ variants, isExpanded }) => {
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <li className={classes(styles.wrapper, styles.button)}>
      <div className={styles.icon} onClick={toggleColorScheme}>
        <Icon name='dark_mode' />
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
        <Icon name='light_mode' />
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
