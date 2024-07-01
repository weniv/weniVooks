import Image from 'next/image';
import { DEFAULT_PATH, TITLE } from './data';

// 교안 표지
export default function Home() {
  return (
    <main>
      <h3 className="title">{TITLE}</h3>
      <Image
        src={`/images/${DEFAULT_PATH}/cover-${DEFAULT_PATH}.png`}
        alt=""
        className="cover"
        width={658}
        height={800}
        priority={true}
      />
    </main>
  );
}
