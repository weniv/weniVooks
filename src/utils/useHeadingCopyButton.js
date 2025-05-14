// C:\github_project\weniVooks\src\hooks\useHeadingCopyButton.js

import { useEffect } from 'react';

export function useHeadingCopyButton() {
  useEffect(() => {
    const headings = document.querySelectorAll('h4, h5, h6');

    headings.forEach((heading) => {
      if (!heading.id) {
        heading.id = heading.textContent.toLowerCase().replace(/\s+/g, '-');
      }

      const button = document.createElement('button');
      button.innerHTML =
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
      button.style.cssText =
        'margin-left: 8px; background: none; border: none; cursor: pointer; opacity: 0; transition: opacity 0.2s;';
      button.setAttribute('aria-label', 'Copy link to this section');

      button.addEventListener('click', (e) => {
        e.preventDefault();
        const url = `${window.location.origin}${window.location.pathname}#${heading.id}`;
        navigator.clipboard.writeText(url);
        // 여기에 복사 완료 알림을 추가할 수 있습니다.
      });

      heading.appendChild(button);

      heading.addEventListener('mouseenter', () => {
        button.style.opacity = '1';
      });

      heading.addEventListener('mouseleave', () => {
        button.style.opacity = '0';
      });
    });
  }, []);
}
