import Image from 'next/image';

export default async function Home() {
  return (
    <>
      <div className="content__wrap">
        <main className="main">
          <div className="main__inner">
            {/* contents */}
            <h3 className="title">
              "위니브월드 탐험대 - 게임으로 배우는 파이썬 교육 플랫폼(선생님용)
            </h3>
            <Image
              src="/images/wenivworld/cover-weniv-world-teacher.png"
              alt="위니브월드 탐험대 - 게임으로 배우는 파이썬 교육 플랫폼(선생님용)"
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
