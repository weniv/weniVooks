export async function getData(DEFAULT_PATH) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/menu${DEFAULT_PATH}.json`,
    {
      cache: 'force-cache',
    },
  );

  if (!res.ok) {
    throw new Error('데이터를 가져오지 못했습니다');
  }
  return res.json();
}
