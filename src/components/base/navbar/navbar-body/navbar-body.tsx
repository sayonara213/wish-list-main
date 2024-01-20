import React from 'react';

import styles from './navbar-body.module.scss';

import { Heading } from '../heading/heading';
import { INavbarItem } from '../navbar';
import { NavbarItem } from '../navbar-item/navbar-item';
import { NavbarSignOut } from '../navbar-sign-out/navbar-sign-out';
import { NavbarUsers } from '../navbar-users/navbar-users';
import { ThemeSwitch } from '../theme-switch/theme-switch';

interface INavbarBodyProps {
  isExpanded: boolean;
  toggleNav: () => void;
  closeOnClick?: boolean;
}

export const NavbarBody: React.FC<INavbarBodyProps> = ({ isExpanded, toggleNav, closeOnClick }) => {
  const navbarItems: INavbarItem[] = [
    { name: 'home', icon: 'home', link: '/' },
    { name: 'profile', icon: 'person', link: '/profile' },
    {
      name: 'friends',
      icon: 'diversity_1',
      children: <NavbarUsers closeNav={closeOnClick ? toggleNav : undefined} />,
      onClick: toggleNav,
    },
    { name: 'notifications', icon: 'notifications', link: '/notifications' },
  ];

  return (
    <>
      <Heading isExpanded={isExpanded} toggleNav={toggleNav} />
      <ul className={styles.list}>
        <div className={styles.list}>
          {navbarItems.map((item, index) => (
            <NavbarItem
              name={item.name}
              icon={item.icon}
              key={index}
              isExpanded={isExpanded}
              toggleNav={closeOnClick ? toggleNav : undefined}
              link={item.link}
              onClick={item.onClick}
            >
              {item.children}
            </NavbarItem>
          ))}
        </div>
        <div className={styles.list}>
          <NavbarSignOut isExpanded={isExpanded} />
          <ThemeSwitch isExpanded={isExpanded} />
        </div>
      </ul>
    </>
  );
};
