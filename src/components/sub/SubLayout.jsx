'use client';
import classNames from 'classnames';
import BtnTop from '../common/button/BtnTop';
import SideContainer from './SideContainer';
import SubBreadcrumb from './SubBreadcrumb';

import styles from './SubLayout.module.scss';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

export default function SubLayout(props) {
  const { children } = props;

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.subLayout}>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="menu-container"
        unmountOnExit
      >
        <SideContainer
          className={styles.left}
          setIsOpen={setIsOpen}
          {...props}
        />
      </CSSTransition>

      <div className={styles.right}>
        <SubBreadcrumb isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className={classNames(styles.contents, 'sub-contents')}>
          {children}
        </div>
      </div>

      {/* <Page data={menuDdata} DEFAULT_PATH={DEFAULT_PATH} /> */}
      <BtnTop />
    </div>
  );
}
