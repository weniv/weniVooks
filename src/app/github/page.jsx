import Image from 'next/image';

export default async function Home() {
  return (
    <>
      <div className="content__wrap">
        <main className="main">
          <div className="main__inner">
            {/* contents */}
            <h3 className="title">알잘깔딱센 GitHub 핵심개념</h3>
            <Image
              src="/images/github/cover-github.png"
              alt="{알잘깔딱센 GitHub 핵심개념}"
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
