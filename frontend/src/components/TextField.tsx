import React, { FC } from 'react';

interface Props {
  type?: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
}

const TextField: FC<Props> = ({
  type = 'text',
  name,
  value,
  onChange,
  label,
  placeholder
}) => {
  return <div className='w-full'>
    {label && <p className='font-medium mb-2'>{label}</p>}
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      name={name}
      className="w-full h-12 rounded border border-gray-300 px-3"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
    />
  </div>
}

export default TextField;