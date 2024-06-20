import Image from "next/image";

export default async function Home() {
  return (
    <>
      <div className="content__wrap">
        <main className="main">
          <div className="main__inner">
            {/* contents */}
            <h3 className="title">{/* {교안 제목} */}</h3>
            <Image
              src="/images/{교안 이미지 폴더}/{커버 이미지}"
              alt="{교안 제목}"
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
