'use client';
import { useRouter } from 'next/navigation';

import BtnIcon from '@/components/common/button/BtnIcon';

import styles from './SearchForm.module.scss';
import SVGSearch from '@/components/svg/SVGSearch';

export default function SearchForm() {
  // const router = useRouter();

  // 현재 책 구분
  // const [currentBook, setCurrentBook] = useState('');
  // useEffect(() => {
  //   const currentURl = window.location.href;
  //   setCurrentBook(currentURl.split('http://localhost:3000/')[1]);
  // }, []);

  // const searchKeyword = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.keyword);

  //   // const keyword = e.target.keyword.value;
  //   // router.push(`/search?q=${keyword}`);
  // };

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

      <BtnIcon
        type="button"
        className={styles.btnSearch}
        children={<SVGSearch color="grayLv4" />}
        bordernone="true"
      ></BtnIcon>
    </form>
  );
}
