'use client';

import React, { useEffect, useState } from 'react';

import { Heading } from './heading/heading';
import { NavbarItem } from './navbar-item/navbar-item';
import styles from './navbar.module.scss';
import { ThemeSwitch } from './theme-switch/theme-switch';
import { NavbarWishlists } from './wishlists/wishlists';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const [wishlists, setWishlists] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
          {navbarItems.map((item, index) => (
            <NavbarItem
              name={item.name}
              icon={item.icon}
              key={index}
              variants={textVariants}
              isExpanded={isExpanded}
            >
              {item.children}
            </NavbarItem>
          ))}
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
