import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonNeoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'phase';
  isActive?: boolean;
}

export const ButtonNeo: React.FC<ButtonNeoProps> = ({ 
  children, 
  className, 
  variant = 'primary', 
  isActive = false,
  ...props 
}) => {
  const baseClass = "px-4 py-2 font-bold transition-all duration-100 ease-in-out border-[3px] border-black rounded-md";
  const shadowClass = isActive ? "translate-x-1 translate-y-1 shadow-none" : "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none";
  
  let variantClass = "bg-white text-black";
  if (variant === 'primary') variantClass = "bg-[#FFEB3B] text-black";
  if (variant === 'accent') variantClass = "bg-[#06D6A0] text-black";
  if (variant === 'phase' && isActive) variantClass = "bg-black text-white";

  return (
    <button 
      className={twMerge(clsx(baseClass, shadowClass, variantClass, className))} 
      {...props}
    >
      {children}
    </button>
  );
};
