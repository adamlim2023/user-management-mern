import React, { FC } from 'react';

interface optionProps {
  id: string | number;
  label: string;
}

interface Props {
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  placeholder?: string;
  options?: optionProps[]
}

const Select: FC<Props> = ({
  name,
  value,
  onChange,
  label,
  placeholder,
  options
}) => {
  return <div className='w-full'>
    {label && <p className='font-medium mb-2'>{label}</p>}
    <select
      value={value}
      placeholder={placeholder}
      name={name}
      className="w-full h-12 rounded border border-gray-300 px-3 appearance-none"
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e)}
    >
      {placeholder && <option>{placeholder}</option>}
      {
        options?.map((option: optionProps) => <option
          key={option.id}
          value={option.id}
        >
          {option.label}
        </option>)
      }
    </select>
  </div>
}

export default Select;