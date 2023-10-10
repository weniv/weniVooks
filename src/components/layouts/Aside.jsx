import Link from 'next/link';
import BtnIcon from '../common/button/BtnIcon';

import styles from './Aside.module.scss';
import SubBanner from './aside/SubBanner';
import SVGListClose from '../svg/SVGListClose';

export default function Aside() {
  return (
    <aside className={styles.aside}>
      <div className={styles.sublist}>
        <h3>연산과 구문</h3>
        <ol>
          <li>
            <Link href="">연산과 구문이란?</Link>
            <ol>
              <li>
                <Link href="">1.1 가르키는것</Link>
                <ol>
                  <li>
                    <Link href="">저희 집에는 아이가 있습니다.</Link>
                  </li>
                </ol>
              </li>
            </ol>
          </li>
          <li>
            <Link href="">2. 변수 이름의 규칙</Link>
            <ol>
              <li>
                <Link href="">2.1 변수 이름 짓기</Link>
              </li>
              <li>
                <Link href="">2.2 올바른 변수 이름의 예</Link>
              </li>
              <li>
                <Link href="">2.2 잘못된 변수 이름의 예</Link>
              </li>
            </ol>
          </li>
        </ol>
        <BtnIcon
          className={styles.btnClose}
          children={<SVGListClose color="grayLv3" />}
        />
      </div>

      <SubBanner />
    </aside>
  );
}
