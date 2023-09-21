import SVGLoading from '@/components/svg/SVGLoading';

import styles from './loading.module.scss';

export default function loading() {
  return (
    <div className={styles.wrap}>
      <p className={styles.loading}>
        <SVGLoading />
        LOADING
      </p>
    </div>
  );
}
