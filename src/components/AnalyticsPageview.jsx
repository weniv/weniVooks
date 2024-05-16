'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AnalyticsPageview() {
  const pathname = usePathname();

  const sendPageveiw = (sessionId) => {
    let payload = { url: window.location.href };
    let header = { 'Content-Type': 'application/json' };

    if (sessionId) {
      payload = { url: window.location.href, session_id: sessionId };
      header = {
        'Content-Type': 'application/json',
        'Session-Id': sessionId,
      };
    }

    fetch('https://www.analytics.weniv.co.kr/collect/pageview', {
      method: 'POST',
      headers: header,
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (!sessionId) {
          localStorage.setItem('session_id', data.session_id);
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  useEffect(() => {
    let session_id = localStorage.getItem('session_id');
    const lastPage = sessionStorage.getItem('lastPage');

    if (!session_id) {
      // 사이트 첫 방문
      sendPageveiw();
    } else {
      if (lastPage !== pathname) {
        // 페이지 이동
        sendPageveiw(session_id);
      } else {
        // 새로고침
      }
    }

    sessionStorage.setItem('lastPage', pathname);
  }, [pathname]);
}
