import Image from 'next/image';

import { DEFAULT_PATH, TITLE } from './data';

export default async function Home() {
  return (
    <>
      <div className="content__wrap">
        <main className="main">
          <div className="main__inner">
            {/* contents */}
            <h3 className="title">{TITLE}</h3>
            <Image
              src={`/images${DEFAULT_PATH}/cover-sql.png`}
              alt={TITLE}
              className="cover"
              width={658}
              height={800}
              priority={true}
            />
            {/* contents */}
          </div>
        </main>
      </div>
    </>
  );
}
