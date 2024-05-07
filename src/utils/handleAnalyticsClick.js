//  클릭 이벤트 리스너 등록

export default async function handleAnalyticsClick(event, text) {
  event.preventDefault(); // 기본 동작 막기

  const ANCHOR = event.currentTarget;

  const session_id = sessionStorage.getItem('session_id');

  const source_url = window.location.href;
  const target_url = ANCHOR.href;
  const target_tar = ANCHOR.target || '_self';

  try {
    const response = await fetch(
      'https://www.analytics.weniv.co.kr/collect/anchor-click',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Session-Id': session_id,
        },
        body: JSON.stringify({ source_url, target_url, type: text }),
      },
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    window.open(target_url, target_tar);
  }
}
