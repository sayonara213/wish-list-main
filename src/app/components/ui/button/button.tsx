import React from 'react';

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  color?: 'primary' | 'secondary' | 'danger';
}

const variants = {
  solid:
    'py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800',
  outline:
    'py-[.688rem] px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-200 font-semibold text-primary-500 hover:text-white hover:bg-primary-500 hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all text-sm dark:border-gray-700 dark:hover:border-primary-500',
  ghost:
    'py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-primary-500 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all text-sm',
  link: 'py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-primary-500 hover:text-primary-700 focus:outline-none focus:ring-2 ring-offset-white focus:ring-primary-500 focus:ring-offset-2 transition-all text-sm',
};

export const Button: React.FC<IButtonProps> = ({
  children,
  variant = 'solid',
  color = 'primary',
}) => {
  return (
    <button type='button' className={variants[variant]}>
      {children}
    </button>
  );
};
