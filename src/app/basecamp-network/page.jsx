import Image from 'next/image';

export default async function Home() {
  return (
    <>
      <div className="content__wrap">
        <main className="main">
          <div className="main__inner">
            {/* contents */}
            <h3 className="title">웹/네트워크/HTTP 베이스캠프 for developer</h3>
            <Image
              src="/images/basecamp-network/cover-network.png"
              alt="웹/네트워크/HTTP 베이스캠프 for developer"
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
