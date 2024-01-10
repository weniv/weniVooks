import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { convertMarkdownToHtml } from './convertMarkdownToHtml';

const postsDirectory = path.join(process.cwd(), '_md');

export async function getPostDetail(defaultPath, id) {
  const detailPath = `${postsDirectory}${defaultPath}/${id.join('/')}.md`;

  const readContent = (path) => {
    try {
      return fs.readFileSync(path, 'utf-8');
    } catch (error) {
      console.log(error);
      console.log('🚨 파일 경로 확인하기');
      return '';
    }
  };
  const content = readContent(detailPath);

  const matterData = matter(content);

  const htmlContent = await convertMarkdownToHtml(matterData.content);

  return {
    id,
    htmlContent,
    ...matterData.data,
  };
}
