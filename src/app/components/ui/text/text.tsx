import React from 'react';

import { classes } from '@/app/utils/styles';

import styles from './text.module.scss';

export interface ITextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  size?: 'sm' | 'base' | 'md' | 'bg' | 'lg';
  color?: 'default' | 'muted' | 'link';
  weight?: 'normal' | 'medium' | 'bold';
}

export const Paragraph: React.FC<ITextProps> = ({
  children,
  size = 'base',
  color = 'default',
  weight = 'normal',
  ...props
}) => {
  return (
    <p className={classes(styles[size], styles[color], styles[weight])} {...props}>
      {children}
    </p>
  );
};
