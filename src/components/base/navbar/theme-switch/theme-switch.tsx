import styles from './theme-switch.module.scss';

import { useTheme } from '@/components/base/provider/theme-provider';
import { Icon } from '@/components/ui/icon/icon';
import { classes } from '@/utils/styles';

import { Switch } from '@mantine/core';
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
  const { theme, toggleTheme } = useTheme();

  return (
    <li className={classes(styles.wrapper, !isExpanded && styles.button)}>
      <AnimatePresence mode='wait'>
        {theme === 'dark' ? (
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
            <Switch checked={theme === 'dark'} onChange={toggleTheme} />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};
