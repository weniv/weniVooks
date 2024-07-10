import Image from 'next/image';

export default function CoverPage({ TITLE, COVER }) {
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
