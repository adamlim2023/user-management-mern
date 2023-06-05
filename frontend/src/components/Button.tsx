import React, { FC } from 'react';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  color?: 'primary' | 'light' | 'danger',
  size?: 'lg' | 'sm'
}

const Button: FC<Props> = ({ children, onClick, color = 'primary', size = 'lg' }) => {
  const colorStyles = {
    primary: "text-white bg-sky-400",
    light: "text-gray-700 bg-white",
    danger: "text-white bg-red-500"
  }
  return <button
    className={`${size === `lg` ? `h-10 font-medium text-base px-4` : `h-8 font-regular text-sm px-2`} rounded ${colorStyles[color]} shadow`}
    onClick={onClick}
  >
    {children}
  </button>
}

export default Button;