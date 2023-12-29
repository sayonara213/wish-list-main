import React, { useState } from 'react';

import styles from './burger.module.scss';

import { INavbarItem } from '../navbar';
import { NavbarBody } from '../navbar-body/navbar-body';
import { ThemeSwitch } from '../theme-switch/theme-switch';

import { Burger, Drawer } from '@mantine/core';
import { Variants } from 'framer-motion';

interface IBurgerProps {
  navbarItems: INavbarItem[];
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
      <Drawer
        opened={open}
        onClose={() => setOpen(false)}
        title='menu'
        overlayProps={{ backgroundOpacity: 0.3, blur: 1 }}
      >
        <NavbarBody
          isExpanded={open}
          textVariants={textVariants}
          toggleNav={handleToggle}
          navbarItems={navbarItems}
          handleSignOut={handleSignOut}
          closeOnClick
        />
      </Drawer>
      <div className={styles.nav}>
        <Burger opened={open} onClick={handleToggle} color='white' />
        <ThemeSwitch variants={{}} isExpanded={false} />
      </div>
    </>
  );
};
