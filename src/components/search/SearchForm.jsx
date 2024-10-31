'use client';
import { useRef } from 'react';
import BtnIcon from '@/components/common/button/BtnIcon';
import styles from './SearchForm.module.scss';
import SVGSearch from '@/components/svg/SVGSearch';

export default function SearchForm() {
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    if (!inputRef.current.value.trim()) {
      event.preventDefault();
    }
  };

  return (
    <form
      className={styles.search}
      action="/search"
      method="GET"
      onSubmit={handleSubmit}
    >
      <label className="a11y-hidden" htmlFor="search">
        검색
      </label>
      <input
        id="search"
        type="search"
        placeholder="검색어를 입력하세요."
        name="keyword"
        ref={inputRef}
      />

      <BtnIcon type="submit" className={styles.btnSearch} bordernone="true">
        <SVGSearch color="grayLv4" />
        <span className="a11y-hidden">검색</span>
      </BtnIcon>
    </form>
  );
}
