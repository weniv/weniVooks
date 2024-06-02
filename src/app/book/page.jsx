import Image from 'next/image';
import { DEFAULT_PATH, TITLE } from './data';

export default async function Home() {
  return (
    <>
      <h3 className="title">{TITLE}</h3>
      <Image
        src={`/images/${DEFAULT_PATH}/cover-${DEFAULT_PATH}.png`}
        alt="{교안 제목}"
        className="cover"
        width={658}
        height={800}
        priority={true}
      />
    </>
  );
}
