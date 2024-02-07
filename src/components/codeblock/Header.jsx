import React from 'react';
import styles from '@/components/codeblock/CodeBlock.module.scss';
import ExecutionIcon from '@/components/svg/ExecutionIcon';
import CopyIcon from '../svg/CopyIcon';
import HelpCircleIcon from '../svg/HelpCircleIcon';

function Header({ event, copyCode }) {
  return (
    <div className={styles.taskbar}>
      <button id="btn-run" onClick={event}> 
        <ExecutionIcon alt="코드 실행 버튼" />
      </button>
      <div>
        <button
          onClick={() => {
            copyCode();
          }}
          className={styles.tooltip}
        >
          <CopyIcon alt="코드 복사 버튼" />
          <span className={styles.tooltipText}>복사하기</span>
        </button>
        <button className={styles.tooltip}>
          <HelpCircleIcon alt="코드 블록 사용법 알림" />
          <span className={styles.tooltipText}>
            Shift-ENTER 또는
            <br /> 왼쪽 플레이 버튼을 누르면 실행됩니다.
          </span>
        </button>
      </div>
    </div>
  );
}

export default React.memo(Header);
