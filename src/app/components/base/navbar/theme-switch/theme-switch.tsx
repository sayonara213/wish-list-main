import { Icon } from '@/app/components/ui/icon/icon';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface IThemeSwitchProps {
  variants: Variants;
  isExpanded: boolean;
}

const iconVariants: Variants = {
  show: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.3 } },
  hide: { opacity: 0, x: -30, transition: { duration: 0.3 } },
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
    const htmlEl = document.documentElement;

    if (isDark) {
      htmlEl.classList.add('dark');
    } else {
      htmlEl.classList.remove('dark');
    }

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <li className='box-content flex h-[24px] cursor-pointer select-none items-center space-x-2 rounded-md p-2 transition-colors duration-150'>
      <AnimatePresence mode='wait'>
        {isDark ? (
          <motion.div
            key='dark_mode'
            initial='hide'
            animate='show'
            exit='hide'
            variants={iconVariants}
            className='flex items-center justify-center'
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
            className='flex items-center justify-center'
          >
            <Icon name='light_mode' />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isExpanded && (
          <motion.input
            initial='hide'
            animate='show'
            exit='hide'
            variants={variants}
            type='checkbox'
            id='hs-basic-usage'
            className='relative h-7 w-[3.25rem] cursor-pointer appearance-none rounded-full border-2 border-transparent bg-gray-100 ring-1 ring-transparent ring-offset-white transition-colors duration-200 ease-in-out before:inline-block before:h-6 before:w-6 before:translate-x-0 before:transform before:rounded-full before:bg-white before:shadow before:ring-0 before:transition before:duration-200 before:ease-in-out checked:bg-primary-600 checked:bg-none checked:before:translate-x-full checked:before:bg-blue-200 focus:border-primary-500 focus:outline-none focus:ring-primary-600 dark:bg-gray-700 dark:before:bg-gray-400 dark:checked:bg-primary-600 dark:checked:before:bg-primary-200 dark:focus:ring-offset-gray-800'
            checked={isDark}
            onChange={toggleTheme}
          />
        )}
      </AnimatePresence>
    </li>
  );
};
