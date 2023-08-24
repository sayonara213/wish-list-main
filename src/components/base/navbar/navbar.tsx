'use client';

import React, { useState } from 'react';

import { Heading } from './heading/heading';
import { NavbarItem } from './navbar-item/navbar-item';
import styles from './navbar.module.scss';
import { ThemeSwitch } from './theme-switch/theme-switch';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const supabase = createClientComponentClient();

  const toggleNav = () => {
    setIsExpanded(!isExpanded);
  };

  const sidebarVariants = {
    expanded: { width: '270px' },
    collapsed: { width: '80px' },
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
    <motion.div
      initial='collapsed'
      animate={isExpanded ? 'expanded' : 'collapsed'}
      variants={sidebarVariants}
      transition={{ duration: 0.5, ease: 'backInOut' }}
      className={styles.navbar}
    >
      <Heading variants={textVariants} isExpanded={isExpanded} toggleNav={toggleNav} />
      <ul>
        <div>
          <NavbarItem
            name='Shared wishlists'
            icon='favorite'
            variants={textVariants}
            isExpanded={isExpanded}
          />
          <NavbarItem
            name='profile'
            icon='person'
            variants={textVariants}
            isExpanded={isExpanded}
          />
          <NavbarItem
            name='profile'
            icon='person'
            variants={textVariants}
            isExpanded={isExpanded}
          />
        </div>
        <div>
          <NavbarItem
            name='log out'
            icon='logout'
            variants={textVariants}
            isExpanded={isExpanded}
            onClick={handleSignOut}
          />
          <ThemeSwitch variants={textVariants} isExpanded={isExpanded} />
        </div>
      </ul>
    </motion.div>
  );
};
