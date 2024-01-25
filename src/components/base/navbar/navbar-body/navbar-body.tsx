import React from 'react';

import styles from './navbar-body.module.scss';

import { Heading } from '../heading/heading';
import { INavbarItem } from '../navbar';
import { NavbarItem } from '../navbar-item/navbar-item';
import { NavbarSignOut } from '../navbar-sign-out/navbar-sign-out';
import { NavbarUsers } from '../navbar-users/navbar-users';
import { ThemeSwitch } from '../theme-switch/theme-switch';
import { IconBell, IconHome, IconUser, IconUsers } from '@tabler/icons-react';

interface INavbarBodyProps {
  isExpanded: boolean;
  toggleNav: () => void;
  closeOnClick?: boolean;
}

export const NavbarBody: React.FC<INavbarBodyProps> = ({ isExpanded, toggleNav, closeOnClick }) => {
  const navbarItems: INavbarItem[] = [
    { name: 'home', icon: <IconHome color='white' />, link: '/' },
    { name: 'profile', icon: <IconUser color='white' />, link: '/profile' },
    {
      name: 'friends',
      icon: <IconUsers color='white' />,
      children: <NavbarUsers closeNav={closeOnClick ? toggleNav : undefined} />,
      onClick: toggleNav,
    },
    { name: 'notifications', icon: <IconBell color='white' />, link: '/notifications' },
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
