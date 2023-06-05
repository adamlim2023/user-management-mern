import React, { FC } from 'react';
import CloseIcon from 'assets/images/icons/close.png';

interface Props {
  title?: string;
  opened: boolean;
  onClose?: () => void;
  children: React.ReactNode
}

const Modal: FC<Props> = ({ title, opened, onClose, children }) => {
  return <>
    {opened &&
      <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
        <div
          className='absolute top-0 left-0 right-0 bottom-0 bg-[#00000060]'
          onClick={onClose}
        />
        <div className='relative w-[600px] z-10 bg-white'>
          <div className='flex justify-between items-center p-5 border-b border-b-gray-100'>
            <h4 className='font-medium text-xl'>{title}</h4>
            <button onClick={onClose} className='opacity-70'>
              <img src={CloseIcon} className='w-4 h-4' />
            </button>
          </div>
          <div>
            {children}
          </div>
        </div>
      </div>
    }
  </>
}

export default Modal;