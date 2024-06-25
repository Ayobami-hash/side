import React, { useState, useRef, useEffect } from 'react';
import DropdownItem from './DropdownItem';

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  value: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-orange-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {value}
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div 
            className="py-1" 
            role="menu" 
            aria-orientation="vertical" 
            aria-labelledby="options-menu">
            {options.map((option, index) => (
              <DropdownItem key={index} label={option} onClick={() => handleItemClick(option)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
