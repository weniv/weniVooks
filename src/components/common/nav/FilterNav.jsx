import React from 'react';
import styles from './FilterNav.module.scss';

const FilterNav = ({ 
  options, 
  selectedValue, 
  onSelect,
  className = ''
}) => {
  return (
    <nav className={`${styles.filterNav} ${className}`} role="navigation">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelect(option)}
          className={`${styles.filterButton} ${
            option.value === selectedValue ? styles.active : ''
          }`}
          aria-current={option.value === selectedValue ? 'page' : undefined}
        >
          {option.text}
        </button>
      ))}
    </nav>
  );
};

export default FilterNav;