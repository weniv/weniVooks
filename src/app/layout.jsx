import { Source_Code_Pro, Nanum_Myeongjo } from 'next/font/google';

import Script from 'next/script';

import '@/styles/globals.scss';

import SettingProvider from '@/context/SettingContext';
import Body from '@/components/layouts/body/Body';
import classNames from 'classnames';

const source_code_pro = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--code',
});

const nanum_myeongjo = Nanum_Myeongjo({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--myeongjo',
});

export const metadata = {
  metadataBase: new URL('https://www.books.weniv.co.kr'),
  title: '위니북스',
  description: '위니브의 다양한 교안을 웹에서 확인해보세요!',

  openGraph: {
    type: 'website',
    title: '위니북스',
    description: '위니브의 다양한 교안을 웹에서 확인해보세요!',
    url: 'https://www.books.weniv.co.kr',
    siteName: '위니북스',
    images: [`https://www.books.weniv.co.kr/images/opengraph-image.png`],
  },
  twitter: {
    card: 'summary',
    title: '위니북스',
    description: '위니브의 다양한 교안을 웹에서 확인해보세요!',
    images: ['https://www.books.weniv.co.kr/images/opengraph-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ko-KR"
      className={classNames(source_code_pro.variable, nanum_myeongjo.variable)}
    >
      <meta
        name="naver-site-verification"
        content="41cf482a18407bafc8016d991cbf008f55c7a733"
      />

      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_ID}`}
      ></Script>
      <Script>
        {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');`}
      </Script>
      <Script src="/analytics/analytics-pageview.js"></Script>

      <SettingProvider>
        <Body>{children}</Body>
      </SettingProvider>
    </html>
  );
}
