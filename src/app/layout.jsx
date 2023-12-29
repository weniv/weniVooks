import Script from 'next/script';

import '@/styles/globals.scss';

import SettingProvider from '@/context/SettingContext';
import Body from '@/components/layouts/body/Body';

export const metadata = {
  title: '위니북스',
  description: '위니브의 다양한 교안을 웹에서 확인해보세요!',
  openGraph: {
    type: 'website',
    title: '위니북스',
    description: '위니브의 다양한 교안을 웹에서 확인해보세요!',
    url: 'https://books.weniv.co.kr',
    siteName: '위니북스',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko-KR">
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_ID}`}
      ></Script>
      <Script>
        {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.GA_ID}');`}
      </Script>
      <SettingProvider>
        <Body>{children}</Body>
      </SettingProvider>
    </html>
  );
}
