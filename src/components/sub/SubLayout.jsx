import Page from '@/app/_sample/[...slug]/page';
import BtnTop from '../common/button/BtnTop';
import SideContainer from './SideContainer';
import SubBreadcrumb from './SubBreadcrumb';

import styles from './SubLayout.module.scss';
import PageIndex from './PageIndex';

export default function SubLayout(props) {
  const { children } = props;
  return (
    <div className={styles.subLayout}>
      <SideContainer className={styles.left} {...props} />
      <div className={styles.contents}>
        <SubBreadcrumb />
        <main className="sub-main">{children}</main>
      </div>
      <PageIndex className={styles.right} />

      {/* <Page data={menuDdata} DEFAULT_PATH={DEFAULT_PATH} /> */}
      <BtnTop />
    </div>
  );
}
