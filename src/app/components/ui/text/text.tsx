import React from 'react';

interface ITextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  color?: 'primary' | 'secondary';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
}

const colors = {
  primary: 'text-black dark:text-white',
  secondary: 'text-gray-500 dark:text-gray-400',
};

export const Text: React.FC<ITextProps> = ({
  children,
  size = 'sm',
  color = 'primary',
  weight = 'normal',
  ...props
}) => {
  return (
    <p className={`text-${size} font-${weight} ${colors[color]}`} {...props}>
      {children}
    </p>
  );
};
