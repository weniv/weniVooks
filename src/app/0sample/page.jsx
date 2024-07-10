import { TITLE, COVER } from './bookInfo';
import Image from 'next/image';

// 교안 표지
export default function Home() {
  return (
    <div className="content__wrap">
      <main className="main">
        <h3 className="title">{TITLE}</h3>
        <Image
          src={COVER}
          alt=""
          className="cover"
          width={658}
          height={800}
          priority={true}
        />
      </main>
    </div>
  );
}
