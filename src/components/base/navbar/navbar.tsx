'use client';

import React, { useEffect, useState } from 'react';

import { BurgerNav } from './burger/burger';
import { NavbarBody } from './navbar-body/navbar-body';
import styles from './navbar.module.scss';
import { NavbarWishlists } from './wishlists/wishlists';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion } from 'framer-motion';

const sidebarVariants = {
  expanded: { width: '270px' },
  collapsed: { width: '80px' },
};

export const Navbar = () => {
  const [wishlists, setWishlists] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const supabase = createClientComponentClient();

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

  const fetchWishlists = async () => {
    setIsLoading(true);

    const { data, error } = await supabase.from('wishlists').select('*');
    if (error) {
      console.error('ERROR:', error);
    }

    if (!data) return;

    setWishlists(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchWishlists();
  }, []);

  const navbarItems = [
    { name: 'profile', icon: 'person' },
    {
      name: 'personal wishlists',
      icon: 'feed',
      children: <NavbarWishlists wishlists={wishlists} />,
    },
    { name: 'shared wishlists', icon: 'favorite' },
  ];

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
