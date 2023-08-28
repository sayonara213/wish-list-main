import React from 'react';

import { Heading } from '../heading/heading';
import { INavbarItem } from '../navbar';
import { NavbarItem } from '../navbar-item/navbar-item';
import { ThemeSwitch } from '../theme-switch/theme-switch';

import { Variants } from 'framer-motion';

interface INavbarBodyProps {
  isExpanded: boolean;
  textVariants: Variants;
  navbarItems: INavbarItem[];
  toggleNav: () => void;
  handleSignOut: () => void;
}

export const NavbarBody: React.FC<INavbarBodyProps> = ({
  isExpanded,
  textVariants,
  toggleNav,
  navbarItems,
  handleSignOut,
}) => {
  return (
    <>
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
              link={item.link}
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
    </>
  );
};
