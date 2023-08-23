import { useState, useEffect } from 'react';

import { Switch } from 'antd';
import { AnimatePresence, Variants, motion } from 'framer-motion';

import { Icon } from '@/app/components/ui/icon/icon';
import { classes } from '@/app/utils/styles';

import styles from './theme-switch.module.scss';

interface IThemeSwitchProps {
  variants: Variants;
  isExpanded: boolean;
}

const iconVariants: Variants = {
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'backInOut' } },
  hide: { opacity: 0, x: -30, transition: { duration: 0.3, ease: 'backInOut' } },
};

export const ThemeSwitch: React.FC<IThemeSwitchProps> = ({ variants, isExpanded }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDark(storedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
    }

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <li className={classes(styles.wrapper, !isExpanded && styles.button)} onClick={toggleTheme}>
      <AnimatePresence mode='wait'>
        {isDark ? (
          <motion.div
            key='dark_mode'
            initial='hide'
            animate='show'
            exit='hide'
            variants={iconVariants}
            className={styles.icon}
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
