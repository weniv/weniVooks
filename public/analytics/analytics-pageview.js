// 페이지뷰 데이터 전송
const session_id = sessionStorage.getItem('session_id');
const referrer = document.referrer;

if (!session_id && referrer === '') {
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
      console.log(data);
      sessionStorage.setItem('session_id', data.session_id);
    })
    .catch((error) => console.error('Error:', error));
}
