import Image from 'next/image';

export default async function Home() {
  return (
    <>
      <div className="content__wrap">
        <main className="main">
          <div className="main__inner">
            {/* contents */}
            <h3 className="title">HTML/CSS 에센셜</h3>
            <Image
              src="/images/html-css/cover-essential-html-css.png"
              alt="HTML/CSS 에센셜"
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
