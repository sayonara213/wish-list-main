import React, { useState } from 'react';

import styles from './burger.module.scss';

import { NavbarBody } from '../navbar-body/navbar-body';
import { ThemeSwitch } from '../theme-switch/theme-switch';

import { Burger, Drawer } from '@mantine/core';
import { Variants } from 'framer-motion';

interface IBurgerProps {
  navbarItems: { name: string; icon: string; children?: React.ReactNode }[];
  textVariants: Variants;
  handleSignOut: () => void;
}

export const BurgerNav: React.FC<IBurgerProps> = ({ navbarItems, textVariants, handleSignOut }) => {
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
          handleSignOut={handleSignOut}
        />
      </Drawer>
      <div className={styles.nav}>
        <Burger opened={open} onClick={handleToggle} />
        <ThemeSwitch variants={{}} isExpanded={false} />
      </div>
    </>
  );
};
