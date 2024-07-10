const getMetaObject = (TITLE, DESCRIPTION, DEFAULT_PATH, IMG) => {
  return {
    title: `${TITLE} | 위니북스`,
    description: DESCRIPTION,
    openGraph: {
      type: 'website',
      title: `${TITLE} | 위니북스`,
      url: `https://books.weniv.co.kr/${DEFAULT_PATH}`,
      siteName: '위니북스',
      images: [IMG],
    },
  };
};
export default getMetaObject;
