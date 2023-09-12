import styles from '@/app/not-found.module.scss';

import ButtonBack from '@/components/feature/ButtonBack';
import Button from '@/components/common/Button';

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <img src="/img/404.png" alt="404" />
      <h2>페이지를 찾을 수 없습니다.</h2>
      <p>
        페이지가 존재하지 않거나 사용할 수 없는 페이지입니다.
        <wbr /> 웹 주소가 올바른지 확인해 주세요.
      </p>
      <div className={styles.btnGroup}>
        <Button style="solid" href="./">
          메인으로
        </Button>
        <ButtonBack>이전 페이지</ButtonBack>
      </div>
    </div>
  );
}
