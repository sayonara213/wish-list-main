import React, { useState } from 'react';

import styles from './burger.module.scss';

import { INavbarItem } from '../navbar';
import { NavbarBody } from '../navbar-body/navbar-body';
import { ThemeSwitch } from '../theme-switch/theme-switch';

import { CustomIcon } from '@/components/ui/icon/custom-icon';
import { Icon } from '@/components/ui/icon/icon';
import { Paragraph } from '@/components/ui/text/text';

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
      <Drawer opened={open} onClose={() => setOpen(false)} title='menu'>
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
        <div className={styles.title}>
          <CustomIcon name='logo' size={28} />
          <Paragraph weight='medium' size='md'>
            Wishy
          </Paragraph>
        </div>
        <ThemeSwitch variants={{}} isExpanded={false} />
      </div>
    </>
  );
};
