import { Source_Code_Pro } from 'next/font/google';

import Script from 'next/script';

import '@/styles/globals.scss';

import SettingProvider from '@/context/SettingContext';
import Body from '@/components/layouts/body/Body';

const source_code_pro = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--code',
});

export const metadata = {
  title: '위니북스',
  description: '위니브의 다양한 교안을 웹에서 확인해보세요!',
  openGraph: {
    type: 'website',
    title: '위니북스',
    description: '위니브의 다양한 교안을 웹에서 확인해보세요!',
    url: 'https://books.weniv.co.kr',
    siteName: '위니북스',
    images: [`https://books.weniv.co.kr/images/opengraph-image.png`],
  },
  twitter: {
    card: 'summary',
    title: '위니북스',
    description: '위니브의 다양한 교안을 웹에서 확인해보세요!',
    images: ['https://books.weniv.co.kr/images/opengraph-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko-KR" className={source_code_pro.variable}>
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
