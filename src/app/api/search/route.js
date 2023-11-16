import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parseMarkdown } from '@/app/search/searchUtils';

export async function GET(req) {
  const data = [];

  try {
    const searchParams = new URL(req.url).searchParams;
    const keyword = searchParams.get('keyword') || '';

    // data 디렉토리 내부 디렉토리 이름 가져오기 ex) python, react...
    const dirName = fs
      .readdirSync(path.join(process.cwd(), 'public/data'))
      .filter((dir) => path.extname(dir) === '');

    // 기본 경로
    const basePath = dirName.map((dir) =>
      path.join(process.cwd(), 'public/data/', dir),
    );

    // 파일과 경로 합치기
    const readFile = (files, idx) => {
      const filesList = fs.readdirSync(files);

      const result = filesList.map((file) => {
        const url = path.join(basePath[idx], file);
        return url;
      });

      return result;
    };

    // md 파일 경로 출력
    const filePath = basePath.map((files, idx) => readFile(files, idx));

    for (const dir of filePath) {
      for (const file of dir) {
        data.push(fs.readFileSync(file).toString());
      }
    }

    // 키워드에 적합한 문서만 필터링
    const filteredDocument = data.filter((content) =>
      content.toLowerCase().includes(keyword.toLowerCase()),
    );

    // Alt 텍스트 삭제
    const removeImageAltTexts = (text) => {
      const altTextPattern = /\[.*\]\(.*\)|!\[.*\]\(.*\)/g;
      const result = text.replace(altTextPattern, '');
      return result;
    };

    // aside 태그 삭제
    const removeAsideContent = (text) => {
      const asidePattern = /<aside>(.*?)<\/aside>|💡/gs;
      const result = text.replace(asidePattern, '').trim();
      return result;
    };

    // 제목과 content만을 남김
    const nomalizaiton = filteredDocument.map((doc) =>
      removeAsideContent(removeImageAltTexts(doc)),
    );

    // HTML로 파싱
    const parseHTML = nomalizaiton.map((doc) => parseMarkdown(doc));

    // 특정 문자열을 기준으로 배열을 분할하는 함수
    function splitArray(array, delimiter) {
      const result = [];
      let currentArray = [];

      array.forEach((item) => {
        if (item.includes(delimiter)) {
          if (currentArray.length > 0) {
            result.push(currentArray);
            currentArray = [];
          }
        }
        currentArray.push(item);
      });

      if (currentArray.length > 0) {
        result.push(currentArray);
      }

      return result;
    }

    // obj 형태로 변환
    function convertData(htmlList) {
      const result = [];

      for (const html of htmlList) {
        const mainTitle = html.shift().replace(/<[^>]*>/g, ''); // breadCrumb 두번째 요소로 사용될 메인 제목

        const outputArray = splitArray(html, '<h2>');

        // 검색  keyword가 존재하는 챕터만 남기기
        const filteredChapter = outputArray.filter((subArray) =>
          subArray.some((item) => item.includes(keyword)),
        );

        for (const chapter of filteredChapter) {
          const title = chapter
            .shift()
            .replace(/<[^>]*>/g, '')
            .replace(/[0-9.]/g, '');
          const content = chapter
            .slice(0, 2)
            .map((el) => el.replace(/<[^>]*>/g, ''));

          result.push({
            mainTitle,
            title,
            content,
            link: '/',
          });
        }
      }

      return result;
    }

    const ouput = convertData(parseHTML);

    return NextResponse.json(ouput);
  } catch (err) {
    console.log(err);
    return NextResponse.json('Internal Server Error');
  }
}
