// @ts-nocheck
import {
  parseMarkdown,
  textNormalize,
  filteredChapter,
  getChapterContent,
  getMetaData,
  getBookTitle,
} from '@/app/search/searchUtils';
import fs, { readdirSync, statSync, readFileSync } from 'fs';
import path, { join } from 'path';
import bookData from '@/data/bookList.json';
export const CWD = process.cwd();
export const BASEURL = '_md';
export const ABSOLUTE_PATH = path.join(CWD, BASEURL);

const BOOK_LIST = bookData.reduce((acc, item) => {
  if (item.booklink) {
    acc.push(item.booklink.replace('/', ''));
  }
  return acc;
}, []); // 검색대상 책 리스트

/**
 * 절대경로를 받아 모든 md파일의 주소를 배열로 출력하는 함수
 * @param {string} absolutePath .md 파일 내부 디렉토리 경로
 * @returns {string[]} 모든 .md파일의 주소 출력
 */
export const getFiles = (absolutePath) => {
  const files = fs.readdirSync(absolutePath);
  let fileList = [];

  const filteredBookList = files
    .filter((book) => BOOK_LIST.includes(book.toLowerCase()))
    .filter((book) => book.toLowerCase() !== '.ds_store');

  const readDir = (dirPath) => {
    const mdFiles = readdirSync(dirPath);

    mdFiles.forEach((md) => {
      const mdFilePath = join(dirPath, md);
      const isDir = statSync(mdFilePath).isDirectory();

      if (isDir) {
        readdirSync(mdFilePath).forEach((md) => {
          fileList.push(join(mdFilePath, md));
        });
      }
    });
  };

  filteredBookList.forEach((file) => {
    const filePath = join(absolutePath, file);
    readDir(filePath);
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
    const wholefiles = textNormalize(readFileSync(file).toString());

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

  // 책 별로 한 번만 출력하도록 수정
  for (const data of dataList) {
    const html = data.file;
    const link = data.path.replace(ABSOLUTE_PATH, '').replace(/\.md$/, '');
    const getTitleData = getMetaData(html);
    const title = getTitleData.title; // .md 파일 제목
    const chapter = getTitleData.chapterTitle; // .md 파일 챕터명

    const bookTitle = getBookTitle(link); // .md 파일 책 제목

    let content;

    const chapterList = filteredChapter(html, keyword); // 키워드를 포함하는 챕터
    for (const data of chapterList) {
      content = getChapterContent(data, keyword);
    }

    fileDataList.push({
      bookTitle,
      chapter,
      title,
      link,
      content,
    });
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
