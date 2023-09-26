'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './Select.module.scss';

const Select = ({ options, onSelect, selectedValue }) => {
  const selected = options.find(
    (option) => `${option.value}` === `${selectedValue}`,
  );

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    selected ? selected : options[0],
  );

  const selectRef = useRef(null);
  const optionsRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);

    // focus 이동
    setTimeout(() => {
      const buttons = optionsRef.current.querySelectorAll('button');
      const selectedButton = Array.from(buttons).find(
        (button) => button.value === `${selectedOption.value}`,
      );
      selectedButton.focus();
    }, 100);
  };

  const focusMove = (e) => {
    const buttons = optionsRef.current.querySelectorAll('button');
    if (e.key === 'ArrowDown') {
      buttons[0].focus();
    } else if (e.key === 'ArrowUp') {
      buttons[buttons.length - 1].focus();
    }
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);

    if (onSelect) {
      onSelect(option);
    }
  };

  const handleOutsideClick = (e) => {
    if (selectRef.current && !selectRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e, index) => {
    const buttons = optionsRef.current.querySelectorAll('button');
    if (index === 0) {
      // 첫번째 option
      if ((e.key === 'Tab' && e.shiftKey) || e.key === 'ArrowUp') {
        e.preventDefault();
        buttons[buttons.length - 1].focus();
      }
    } else if (index === options.length - 1) {
      // 마지막 option
      if ((e.key === 'Tab' && !e.shiftKey) || e.key === 'ArrowDown') {
        e.preventDefault();
        buttons[0].focus();
      }
    }
    if (e.key === 'ArrowDown' && index < options.length - 1) {
      buttons[index + 1].focus();
    } else if (e.key === 'ArrowUp' && index > 0) {
      buttons[index - 1].focus();
    }
  };

  useEffect(() => {
    // ESC
    const handleESC = (e) => {
      if (isOpen && e.key === 'Escape') {
        handleToggle();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleESC);
      window.addEventListener('click', handleOutsideClick);
    }
    return () => {
      window.removeEventListener('keydown', handleESC);
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      <h3 className="a11y-hidden">코드 테마</h3>
      <div className={styles.select} ref={selectRef}>
        <button
          className={`${styles.btnSelect} ${isOpen && styles.on}`}
          onClick={handleToggle}
          onKeyDown={focusMove}
          aria-haspopup="listbox"
          aria-expanded={isOpen ? true : false}
          aria-controls="select-options">
          {selectedOption.text}
        </button>

        <ul
          id="select-options"
          role="listbox"
          className={`${isOpen && styles.on} ${styles.optSelect}`}
          ref={optionsRef}>
          {options.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option === selectedOption ? 'true' : 'false'}>
              <button
                type="button"
                value={option.value}
                className={`${
                  option === selectedOption ? styles.activeOption : ''
                } ${option === selectedOption ? styles.selected : ''}`}
                onClick={() => handleSelect(option)}
                onKeyDown={(e) => handleKeyDown(e, index)}>
                {option.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Select;
