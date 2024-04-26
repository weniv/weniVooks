// 앵커 클릭 이벤트 리스너 등록
document.addEventListener('click', function (event) {
  if (event.target.tagName === 'A') {
    event.preventDefault(); // 기본 동작 막기

    var session_id = sessionStorage.getItem('session_id');

    const source_url = window.location.href;
    const target_url = event.target.href;
    const target_bank = event.target.blank || '_self';

    fetch('https://www.analytics.weniv.co.kr/collect/anchor-click', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Session-Id': session_id,
      },
      body: JSON.stringify({ source_url, target_url }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        window.open(target_url, target_bank);
      })
      .catch((error) => console.error('Error:', error));
  }
});
