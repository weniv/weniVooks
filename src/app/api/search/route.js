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
    const filteredData = data.filter((content) =>
      content.toLowerCase().includes(keyword.toLowerCase()),
    );

    // HTML로 파싱
    // const parseHTML = filteredData.map((file) => parseMarkdown(file));

    return NextResponse.json(filteredData);
  } catch (error) {
    return NextResponse.json('Internal Server Error');
  }
}
