import React from 'react';

import styles from './navbar-item.module.scss';

import { Icon } from '@/components/ui/icon/icon';
import { Paragraph } from '@/components/ui/text/text';
import { toNormalCase } from '@/utils/text';

import { AnimatePresence, Variants, motion } from 'framer-motion';

interface INavbarItemProps {
  name: string;
  icon: string;
  link?: string;
  onClick?: () => void;
  isExpanded: boolean;
  variants: Variants;
  children?: React.ReactNode;
}

const liVariants = {
  show: {
    opacity: 1,
    marginTop: '8px',
    marginLeft: '10px',
    height: 'auto',
    transition: { duration: 0.3, delay: 0.4, ease: 'easeInOut' },
  },
  hide: {
    opacity: 0,
    height: '0px',
    marginTop: '0px',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

export const NavbarItem: React.FC<INavbarItemProps> = ({
  name,
  icon,
  link,
  onClick,
  isExpanded,
  variants,
  children,
}) => {
  const click = () => {
    onClick && onClick();
  };

  return (
    <li className={styles.wrapper} onClick={click}>
      <div className={`${styles.item} ${onClick && styles.hover}`}>
        <Icon name={icon} className='5ms transition-all' />
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
              <Paragraph weight='medium'>{toNormalCase(name)}</Paragraph>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {children && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div initial='hide' animate='show' exit='hide' variants={liVariants}>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </li>
  );
};
