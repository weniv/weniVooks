import Image from 'next/image';

export default async function Home() {
  return (
    <>
      <div className="content__wrap">
        <main className="main">
          <div className="main__inner">
            {/* contents */}
            <h3 className="title">JavaScript 베이스캠프</h3>
            <Image
              src="/images/basecamp-javascript/cover-javascript.png"
              alt="JavaScript 베이스캠프"
              className="cover"
              width={658}
              height={800}
            />
            {/* contents */}
          </div>
        </main>
      </div>
    </>
  );
}
