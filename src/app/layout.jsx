import '@/styles/globals.scss';
import styles from './layout.module.scss';

import SettingProvider from '@/context/SettingContext';
import Body from '@/components/layouts/Body';

export const metadata = {
  title: '위니북스',
  description: '위니브의 다양한 교안을 웹에서 확인해보세요!',
  keywords:
    '위니북스, 위니브, 제주코딩베이스캠프, wenivooks, weniv, jejucodingbasecamp',
  openGraph: {
    type: 'website',
    title: '위니북스',
    description: '위니브의 다양한 교안을 웹에서 확인해보세요!',
    url: 'https://books.weniv.co.kr',
    siteName: '위니북스',
  },
};

const BeforeFn = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme !== 'auto' && savedTheme !== null) {
    document.body.classList.add(savedTheme);
  }

  const savedFontStyle = localStorage.getItem('fontStyle');
  if (savedFontStyle !== null) {
    document.body.classList.add(savedFontStyle);
  }

  const savedFontSize = localStorage.getItem('fontSize');

  if (savedFontSize !== null) {
    document.body.classList.add('size' + savedFontSize);
  }

  const savedOpen = localStorage.getItem('menu');

  if (savedOpen === 'close') {
    document.body.classList.add('side-close');
  } else if (savedOpen === 'open') {
    document.body.classList.add('side-open');
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko-KR">
      <SettingProvider>
        <Body>
          <div className={styles.layout}>{children}</div>
          <script
            dangerouslySetInnerHTML={{
              __html: `(${String(BeforeFn)})()`,
            }}
          ></script>
        </Body>
      </SettingProvider>
    </html>
  );
}
