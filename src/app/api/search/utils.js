import {
  parseMarkdown,
  textNormalize,
  filteredChapter,
  getChapterContent,
  getSubTitle,
  getBookTitle,
  getMetaData,
} from '@/app/search/searchUtils';
import fs from 'fs';
import path from 'path';

export const CWD = process.cwd();
export const BASEURL = '_md';
export const ABSOLUTE_PATH = `${CWD}\\${BASEURL}`;
const EXCEPTBOOKLIST = ['python']; // 검색대상에서 제외할 책 리스트

/**
 * 검색 대상에서 특정책 제외
 * @param {string} filePath 파일의 디렉토리 경로
 * @param {string[]} exceptBookList 검색에서 제외할 책 리스트
 * @returns {string} 필터링된 파일의 주소
 */
const exceptBook = (filePath, exceptBookList) => {
  const kind = filePath
    .replace(ABSOLUTE_PATH, '')
    .split('\\')
    .filter((part) => part !== '')[0];

  if (!exceptBookList.includes(kind)) {
    return filePath;
  }

  return null;
};

/**
 * 절대경로를 받아 모든 md파일의 주소를 배열로 출력하는 함수
 * @param {string} absolutePath .md 파일 내부 디렉토리 경로
 * @returns {string[]} 모든 .md파일의 주소 출력
 */
export const getFiles = (absolutePath) => {
  const files = fs.readdirSync(absolutePath);
  let fileList = [];

  files.forEach((file) => {
    const filePath = path.join(absolutePath, file);
    const stat = fs.statSync(filePath);

    const filteredPath = exceptBook(filePath, EXCEPTBOOKLIST);

    if (stat.isDirectory() && filteredPath !== null) {
      fileList = fileList.concat(getFiles(filteredPath));
    } else if (file.endsWith('.md') && filteredPath !== null) {
      fileList.push(filePath);
    }
  });
  return fileList;
};

/**
 * .md파일 리스트를 받아 keyword가 포함된 파일을 반환하는 함수
 * @param {string[]} files .md 파일 내부 디렉토리 경로
 * @param {string[]} keyword 검색 키워드
 *
 * @returns {{path: string, file:string}|null} 키워드가 포함된 파일의 경로 및 파일 내용
 */

export const fileteredFiles = (files, keyword) => {
  const result = [];
  for (const file of files) {
    const wholefiles = textNormalize(fs.readFileSync(file).toString());

    if (wholefiles.includes(keyword)) {
      let val = {
        path: file,
        file: parseMarkdown(wholefiles),
      };
      result.push(val);
    }
  }

  return result;
};

/**
 * 검색결과 출력
 * @param {string[]} dataList 키워드가 포함된 파일리스트
 * @param {string[]} keyword 검색 키워드
 *
 * @returns {{path: string, file:string}|null} 키워드가 포함된 파일의 경로 및 파일 내용
 */
export const customizedData = (dataList, keyword) => {
  const fileDataList = [];

  for (const data of dataList) {
    const html = data.file;
    const link = data.path
      .replace(ABSOLUTE_PATH, '')
      .replace(/\.md$/, '')
      .replaceAll('\\', '/');

    const getTitleData = getMetaData(html);
    const title = getTitleData.title; // .md 파일 제목
    const chapterTitle = getTitleData.chapterTitle; // 챕터 분류 제목

    let subTitle; // 키워드가 포함된 챕터의 소제목
    const chapterList = filteredChapter(html, keyword); // 키워드를 포함하는 챕터

    for (const chapter of chapterList) {
      subTitle = getSubTitle(chapter);
      const content = getChapterContent(chapter, keyword); // 키워드가 포함된 챕터 문장, 최대 3줄

      // const breadcrumbdata = getBreadcrumb(link);
      const bookTitle = getBookTitle(link);

      if (subTitle && content.length !== 0) {
        fileDataList.push({
          bookTitle,
          title,
          chapterTitle,
          subTitle,
          content,
          link,
          // breadcrumb: `${'책제목'} > ${'챕터명'} > ${title}`,
        });
      }
    }
  }

  return fileDataList;
};

export const handlePagination = (searchParams, result) => {
  const pageSize = 10;
  const page = parseInt(searchParams.get('page'), 10) || 1;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    result: result.slice(startIndex, endIndex),
    resultLength: result.length,
    totalPages: Math.ceil(result.length / pageSize),
  };
};
