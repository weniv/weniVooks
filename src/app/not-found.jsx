import styles from './not-found.module.scss';

import Btn from '@/components/common/button/Btn';
import BtnBack from '@/components/common/button/BtnBack';
import Header from '@/components/layouts/header/Header';

export default function NotFound() {
  return (
    <>
      <Header type="notfound" />

      <main className={`layout-content ${styles.notFound}`}>
        <img src="/images/commons/404.png" alt="404" />
        <h2>페이지를 찾을 수 없습니다.</h2>
        <p>
          페이지가 존재하지 않거나 사용할 수 없는 페이지입니다. 웹 주소가
          올바른지 확인해 주세요.
        </p>

        <div className={styles.btnGroup}>
          <Btn solid="true" href="/">
            메인으로
          </Btn>
          <BtnBack>이전 페이지</BtnBack>
        </div>
      </main>
    </>
  );
}
