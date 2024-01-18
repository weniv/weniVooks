import { NextResponse } from 'next/server';
import {
  ABSOLUTE_PATH,
  getFiles,
  fileteredFiles,
  customizedData,
  handlePagination,
} from './utils';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const keyword = searchParams.get('keyword') || '';
    const mdFiles = getFiles(ABSOLUTE_PATH); // .md 파일 리스트

    console.log('mdFiles', mdFiles);

    const data = fileteredFiles(mdFiles, keyword);

    const result = customizedData(data, keyword);

    // const output = handlePagination(searchParams, result);

    // return NextResponse.json(output);
    return 111;
  } catch (err) {
    console.error(err);
    return NextResponse.json('정보를 가져오는데 실패하였습니다', {
      status: 500,
    });
  }
}
