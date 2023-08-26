import React, { useState } from 'react';

import styles from './burger.module.scss';

import { NavbarBody } from '../navbar-body/navbar-body';
import { ThemeSwitch } from '../theme-switch/theme-switch';

import { useTheme } from '@/components/base/provider/theme-provider';

import { Burger, Drawer } from '@mantine/core';

interface IBurgerProps {
  navbarItems: any[];
}

const textVariants = {
  show: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.3 } },
  hide: { opacity: 0, x: -30, transition: { duration: 0.3 } },
};

export const BurgerNav: React.FC<IBurgerProps> = ({ navbarItems }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Drawer opened={open} onClose={() => setOpen(false)} title='menu' className={styles.drawer}>
        <NavbarBody
          isExpanded={open}
          textVariants={textVariants}
          toggleNav={handleToggle}
          navbarItems={navbarItems}
          handleSignOut={() => console.log('sign out')}
        />
      </Drawer>
      <div className={styles.nav}>
        <Burger opened={open} onClick={handleToggle} />
        <ThemeSwitch variants={{}} isExpanded={false} />
      </div>
    </>
  );
};
