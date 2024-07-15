const getMetaObject = (TITLE, DESCRIPTION, DEFAULT_PATH, IMG) => {
  return {
    title: `${TITLE} | 위니북스`,
    description: DESCRIPTION,
    openGraph: {
      type: 'website',
      title: `${TITLE} | 위니북스`,
      description: DESCRIPTION,
      url: `https://books.weniv.co.kr/${DEFAULT_PATH}`,
      siteName: '위니북스',
      images: [IMG],
    },
    twitter: {
      card: 'summary',
      title: `${TITLE} | 위니북스`,
      description: DESCRIPTION,
      images: [IMG],
    },
  };
};
export default getMetaObject;
