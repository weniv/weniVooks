import { DEFAULT_PATH } from '../../data';
import { getMarkdown } from '../../getMarkdown';

export function generateStaticParams() {
  return [
    { chapter: 'chapter01', page: '01-1' },
    { chapter: 'chapter01', page: '01-2' },
    { chapter: 'chapter01', page: '01-3' },

    { chapter: 'chapter02', page: '02-1' },
    { chapter: 'chapter02', page: '02-2' },
    { chapter: 'chapter02', page: '02-3' },

    { chapter: 'chapter03', page: '03-1' },

    { chapter: 'chapter04', page: '04-1' },
    { chapter: 'chapter04', page: '04-2' },

    { chapter: 'chapter05', page: '05-1' },
    { chapter: 'chapter05', page: '05-2' },
    { chapter: 'chapter05', page: '05-3' },

    { chapter: 'chapter06', page: '06-1' },
    { chapter: 'chapter06', page: '06-2' },
    { chapter: 'chapter06', page: '06-3' },
    { chapter: 'chapter06', page: '06-4' },

    { chapter: 'chapter07', page: '07-1' },

    { chapter: 'chapter08', page: '08-1' },
    { chapter: 'chapter08', page: '08-2' },
    { chapter: 'chapter08', page: '08-3' },

    { chapter: 'chapter09', page: '09-1' },

    { chapter: 'chapter10', page: '10-1' },
    { chapter: 'chapter10', page: '10-2' },

    { chapter: 'chapter11', page: '11-1' },
    { chapter: 'chapter11', page: '11-2' },
    { chapter: 'chapter11', page: '11-3' },
    { chapter: 'chapter11', page: '11-4' },
    { chapter: 'chapter11', page: '11-5' },
    { chapter: 'chapter12' },
  ];
}
export default async function Page({ params }) {
  const { title, htmlContent } = await getMarkdown(
    `/${DEFAULT_PATH}/${params.chapter}/${params.page}.md`,
  );

  return (
    <>
      {htmlContent && (
        <>
          <h3 className="title">{title}</h3>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </>
      )}
    </>
  );
}
