'use client';
import { useRef } from 'react';
import BtnIcon from '@/components/common/button/BtnIcon';
import styles from './SearchForm.module.scss';
import SVGSearch from '@/components/svg/SVGSearch';

export default function BookSearchForm() {
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    if (!inputRef.current.value.trim()) {
      event.preventDefault();
    }
  };

  return (
    <form
      className={styles.search}
      action="/book-search"
      method="GET"
      onSubmit={handleSubmit}
    >
      <label className="a11y-hidden" htmlFor="book-search">
        책 제목 검색
      </label>
      <input
        id="book-search"
        type="search"
        placeholder="책 제목을 입력하세요."
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