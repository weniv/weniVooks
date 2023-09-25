import SVGLoading from '@/components/svg/SVGLoading';

import styles from './loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.wrap}>
      <p className={styles.loading}>
        <SVGLoading />
        LOADING
      </p>
    </div>
  );
}
