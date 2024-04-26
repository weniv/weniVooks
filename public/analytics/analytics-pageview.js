// 페이지뷰 데이터 전송
fetch('https://www.analytics.weniv.co.kr/collect/pageview', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ url: window.location.href }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    sessionStorage.setItem('session_id', data.session_id);
  })
  .catch((error) => console.error('Error:', error));
