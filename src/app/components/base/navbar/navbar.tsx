import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { Icon } from '../../ui/icon/icon';
import { Heading } from './heading/heading';

export const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleNav = () => {
    setIsExpanded(!isExpanded);
  };

  const sidebarVariants = {
    expanded: { width: '250px' },
    collapsed: { width: '90px' },
  };

  const textVariants = {
    show: { opacity: 1, x: 0 },
    hide: { opacity: 0, x: -30 },
  };

  return (
    <motion.div
      initial='expanded'
      animate={isExpanded ? 'expanded' : 'collapsed'}
      variants={sidebarVariants}
      transition={{ duration: 0.5 }}
      className='bg-subAccent h-screen overflow-hidden p-5'
    >
      <Heading variants={textVariants} isExpanded={isExpanded} toggleNav={toggleNav} />
      <ul>
        <li className='flex items-center space-x-2 '>
          <Icon name='home' className='5ms transition-all' />
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial='hide'
                animate='show'
                exit='hide'
                variants={textVariants}
                transition={{ duration: 0.3 }}
              >
                <p className='text-white text-xl font-bold'>Home</p>
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        {/* ... Repeat for other nav items */}
      </ul>
    </motion.div>
  );
};
