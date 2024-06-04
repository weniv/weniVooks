import Link from 'next/link';

export default function ChapterIndex({ menuList }) {
  return (
    <>
      {menuList && (
        <ol>
          {menuList[0].sections?.map((item, index) => (
            <li key={index}>
              <Link href={item.link}>{item.title}</Link>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
