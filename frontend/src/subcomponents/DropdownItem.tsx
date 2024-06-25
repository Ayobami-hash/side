import React from 'react';

interface DropdownItemProps {
  label: string;
  onClick: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ label, onClick }) => {
  return (
    <div
      role="menuitem"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      className="cursor-pointer px-4 py-2 hover:bg-orange-200"
    >
      {label}
    </div>
  );
};

export default DropdownItem;
