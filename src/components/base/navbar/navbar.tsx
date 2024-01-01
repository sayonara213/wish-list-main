'use client';

import React, { useState } from 'react';

import { BurgerNav } from './burger/burger';
import { NavbarBody } from './navbar-body/navbar-body';
import { NavbarUsers } from './navbar-users/navbar-users';
import styles from './navbar.module.scss';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion } from 'framer-motion';

const sidebarVariants = {
  expanded: { width: '270px' },
  collapsed: { width: '80px' },
};

export interface INavbarItem {
  name: string;
  icon: string;
  link?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const supabase = createClientComponentClient();

  const navbarItems: INavbarItem[] = [
    { name: 'home', icon: 'home', link: '/' },
    { name: 'profile', icon: 'person', link: '/profile' },
    {
      name: 'friends',
      icon: 'diversity_1',
      children: <NavbarUsers />,
    },
    { name: 'notifications', icon: 'notifications', link: '/notifications' },
  ];

  const toggleNav = () => {
    setIsExpanded(!isExpanded);
  };

  const textVariants = {
    show: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.3 } },
    hide: { opacity: 0, x: -30, transition: { duration: 0.3 } },
  };

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('ERROR:', error);
    }
  }

  return (
    <>
      <div className={styles.burger}>
        <BurgerNav
          navbarItems={navbarItems}
          textVariants={textVariants}
          handleSignOut={handleSignOut}
        />
      </div>
      <motion.div
        initial='collapsed'
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={sidebarVariants}
        transition={{ duration: 0.5, ease: 'backInOut' }}
        className={styles.navbar}
      >
        <NavbarBody
          isExpanded={isExpanded}
          textVariants={textVariants}
          toggleNav={toggleNav}
          navbarItems={navbarItems}
          handleSignOut={handleSignOut}
        />
      </motion.div>
    </>
  );
};
