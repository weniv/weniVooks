'use client';

import React from 'react';

const convertCustomMarkdown = (customMarkdown) => {
  let convertedMarkdown = customMarkdown;

  // 배경 박스 -> 인용문으로 변환
  convertedMarkdown = convertedMarkdown.replace(
    /:::div\{\.box\}([\s\S]*?):::/g,
    (match, content) => {
      return '\n> ' + content.trim().split('\n').join('\n> ') + '\n';
    },
  );

  // 콜아웃 -> 인용문으로 변환
  convertedMarkdown = convertedMarkdown.replace(
    /:::div\{\.callout\}([\s\S]*?):::/g,
    (match, content) => {
      return '\n> 💡  ' + content.trim().split('\n').join('\n> ') + '\n';
    },
  );

  // Before-After (2단 테이블) 변환 - 일반 테이블로 변경
  convertedMarkdown = convertedMarkdown.replace(
    /:::div\{\.beforeAfter\}([\s\S]*?):::/g,
    (match, content) => {
      return content.trim();
    },
  );

  // 링크 변환
  convertedMarkdown = convertedMarkdown.replace(
    /::a\[(.*?)\]\{.*?href="(.*?)".*?\}/g,
    (match, text, url) => {
      // URL에서 <와 > 기호 제거
      const cleanUrl = url.replace(/[<>]/g, '');
      return `[${text}](${cleanUrl})`;
    },
  );

  // 실행코드 변환
  convertedMarkdown = convertedMarkdown.replace(
    /```python-exec([\s\S]*?)```/g,
    (match, content) => {
      return '```python' + content + '```';
    },
  );

  convertedMarkdown = convertedMarkdown.replace(
    /```javascript-exec([\s\S]*?)```/g,
    (match, content) => {
      return '```javascript' + content + '```';
    },
  );

  // HTML/CSS
  convertedMarkdown = convertedMarkdown.replace(
    /:::div\{\.htmlPlay\}([\s\S]*?):::/g,
    (match, content) => {
      // 코드 블록 내용에서 각 줄의 시작 부분 공백 제거
      const trimmedContent = content
        .split('\n')
        .map((line) => line.trimStart())
        .join('\n')
        .trim();

      return trimmedContent;
    },
  );

  // 이미지 변환
  convertedMarkdown = convertedMarkdown.replace(
    /:::figure\s*::img\{.*?src="(.*?)".*?\}\s*::figcaption\[(.*?)\]\s*:::/g,
    (match, src, caption) => {
      // 이미지 경로가 /images로 시작하는 경우에만 도메인 추가
      const fullSrc = src.startsWith('/images')
        ? `https://books.weniv.co.kr${src}`
        : src;
      return `![${caption}](${fullSrc})`;
    },
  );

  // ::img 태그 변환 (사이즈 설정)
  convertedMarkdown = convertedMarkdown.replace(
    /::img\{[^}]*?src="([^"]*?)"[^}]*?\}/g,
    (match, src) => {
      // 이미지 경로가 /images로 시작하는 경우에만 도메인 추가
      const fullSrc = src.startsWith('/images')
        ? `https://books.weniv.co.kr${src}`
        : src;
      return `![](${fullSrc})`;
    },
  );

  // 이미지 캡션 삽입
  convertedMarkdown = convertedMarkdown.replace(
    /!\[\]\((.*?) '(.*?)'\)/g,
    (match, src, caption) => {
      // 이미지 경로가 /images로 시작하는 경우에만 도메인 추가
      const fullSrc = src.startsWith('/images')
        ? `https://books.weniv.co.kr${src}`
        : src;
      return `![${caption}](${fullSrc})`;
    },
  );

  // 테이블 내 이미지 경로 변환
  convertedMarkdown = convertedMarkdown.replace(
    /!\[\]\((\/images\/.*?)\)/g,
    (match, src) => {
      return `![](https://books.weniv.co.kr${src})`;
    },
  );

  // 기타 이미지들도 처리
  convertedMarkdown = convertedMarkdown.replace(
    /!\[(.*?)\]\((\/images\/.*?)\)/g,
    (match, alt, src) => {
      return `![${alt}](https://books.weniv.co.kr${src})`;
    },
  );

  // 개행 처리
  convertedMarkdown = convertedMarkdown.replace(/<br>/g, '\n\n');

  // 텍스트 색상 -> 강조로 변환
  convertedMarkdown = convertedMarkdown.replace(
    /<color=#[0-9A-Fa-f]{6}>(.*?)<\/color>/g,
    (match, text) => {
      return `**${text}**`;
    },
  );

  // 토글 -> 인용문으로 변환
  convertedMarkdown = convertedMarkdown.replace(
    /<toggle>(.*?)::([\s\S]*?)<\/toggle>/g,
    (match, title, content) => {
      return `\n> **${title.trim()}**  \n>\n> ${content
        .trim()
        .split('\n')
        .join('\n> ')}\n`;
    },
  );

  // 볼드 텍스트 표시 수정 (** 처리)
  convertedMarkdown = convertedMarkdown.replace(/\*\*```/g, '```');
  convertedMarkdown = convertedMarkdown.replace(/```\*\*/g, '```');

  return convertedMarkdown;
};

export default function CopyButton({ markdownContent }) {
  const handleCopy = async () => {
    try {
      const convertedMarkdown = convertCustomMarkdown(markdownContent);
      await navigator.clipboard.writeText(convertedMarkdown);
      alert('마크다운이 클립보드에 복사되었습니다.');
    } catch (err) {
      console.error('마크다운 복사 실패:', err);
      alert('복사에 실패했습니다.');
    }
  };

  return (
    <button onClick={handleCopy} className="copy-button">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.83333 4C5.07853 4 4 5.56178 4 7.03333V24.9667C4 26.4382 5.07853 28 6.83333 28H11.5V25H7.00193C7.00073 24.9901 7 24.979 7 24.9667V7.03333C7 7.02104 7.00073 7.00994 7.00193 7H23.9981C23.9993 7.00994 24 7.02104 24 7.03333V10.5H27V7.03333C27 5.56178 25.9215 4 24.1667 4H6.83333ZM16.8333 13C15.2004 13 14 14.3682 14 15.9V34.1C14 35.6318 15.2004 37 16.8333 37H34.1667C35.7996 37 37 35.6318 37 34.1V15.9C37 14.3682 35.7996 13 34.1667 13H16.8333ZM34 34H17V16H34V34ZM31 21.5C31 22.3284 30.3284 23 29.5 23H21.5C20.6716 23 20 22.3284 20 21.5C20 20.6716 20.6716 20 21.5 20H29.5C30.3284 20 31 20.6716 31 21.5ZM29.5 30C30.3284 30 31 29.3284 31 28.5C31 27.6716 30.3284 27 29.5 27H21.5C20.6716 27 20 27.6716 20 28.5C20 29.3284 20.6716 30 21.5 30H29.5Z"
        />
      </svg>
    </button>
  );
}
