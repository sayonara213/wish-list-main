import { useState, useEffect } from 'react';

import styles from './theme-switch.module.scss';

import { Icon } from '@/components/ui/icon/icon';
import { classes } from '@/utils/styles';

import { Switch } from '@mantine/core';
import { AnimatePresence, Variants, motion } from 'framer-motion';

interface IThemeSwitchProps {
  variants: Variants;
  isExpanded: boolean;
}

const iconVariants: Variants = {
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'backInOut' } },
  hide: { opacity: 0, x: -30, transition: { duration: 0.3, ease: 'backInOut' } },
};

export const ThemeSwitch: React.FC<IThemeSwitchProps> = ({ variants, isExpanded }) => {
  const [isDark, setIsDark] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDark(storedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    const root = document.body;
    const theme = isDark ? 'dark' : 'light';
    if (isDark !== undefined && root.dataset.theme !== theme) {
      localStorage.setItem('theme', theme);
      root.dataset.theme = theme;
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <li className={classes(styles.wrapper, !isExpanded && styles.button)}>
      <AnimatePresence mode='wait'>
        {isDark ? (
          <motion.div
            key='dark_mode'
            initial='hide'
            animate='show'
            exit='hide'
            variants={iconVariants}
            className={styles.icon}
            onClick={toggleTheme}
          >
            <Icon name='dark_mode' />
          </motion.div>
        ) : (
          <motion.div
            key='light_mode'
            initial='hide'
            animate='show'
            exit='hide'
            variants={iconVariants}
            className={styles.icon}
            onClick={toggleTheme}
          >
            <Icon name='light_mode' />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isExpanded && (
          <motion.div initial='hide' animate='show' exit='hide' variants={variants}>
            <Switch checked={isDark} onChange={toggleTheme} />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};
