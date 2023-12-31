'use client';
import BtnIcon from '@/components/common/button/BtnIcon';
import styles from './SearchForm.module.scss';
import SVGSearch from '@/components/svg/SVGSearch';

export default function SearchForm() {
  return (
    <form className={styles.search} action="/search" method="GET">
      <label className="a11y-hidden" htmlFor="search">
        검색
      </label>
      <input
        id="search"
        type="search"
        placeholder="검색어를 입력하세요."
        name="keyword"
      />

      <BtnIcon type="submit" className={styles.btnSearch} bordernone="true">
        <SVGSearch color="grayLv4" />
        <span className="a11y-hidden">검색</span>
      </BtnIcon>
    </form>
  );
}
