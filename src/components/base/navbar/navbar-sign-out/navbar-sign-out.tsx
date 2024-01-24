import React from 'react';

import { NavbarItem } from '../navbar-item/navbar-item';

import { Database } from '@/lib/schema';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface INavbarSignOutProps {
  isExpanded: boolean;
}

export const NavbarSignOut: React.FC<INavbarSignOutProps> = ({ isExpanded }) => {
  const supabase = createClientComponentClient<Database>();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('ERROR:', error);
    }
  }
  return (
    <NavbarItem name='sign out' icon='logout' onClick={handleSignOut} isExpanded={isExpanded} />
  );
};