import { Icon } from '@/app/components/ui/icon/icon';
import { toNormalCase } from '@/app/services/text';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import React from 'react';
import { NavbarSubItem } from './navbar-sub-item/navbar-sub-item';
import styles from './navbar-item.module.scss';
import { Paragraph } from '@/app/components/ui/text/text';

interface INavbarItemProps {
  name: string;
  icon: string;
  link?: string;
  onClick?: () => void;
  isExpanded: boolean;
  variants: Variants;
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
}) => {
  const click = () => {
    onClick && onClick();
  };

  return (
    <li className={styles.wrapper}>
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
      {name === 'profile' && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial='hide'
              animate='show'
              exit='hide'
              variants={liVariants}
              className={styles.subWrapper}
            >
              <NavbarSubItem name='Firt wishlist' />
              <NavbarSubItem name='Second wishlist' />
              <NavbarSubItem name='Third wishlist12312312314234' />
              <NavbarSubItem name='Third wishlist' />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </li>
  );
};
