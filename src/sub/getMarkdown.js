import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { convertMarkdownToHtml } from '@/utils/convertMarkdownToHtml';

const postsDirectory = path.join(process.cwd(), '_md');

export async function getMarkdown(defaultPath, isPage) {
  const detailPath = `${postsDirectory}${defaultPath}`;

  const readContent = (path) => {
    try {
      return fs.readFileSync(path, 'utf-8');
    } catch (error) {
      if (isPage) {
        console.log(error);
        console.log('🚨 파일 경로 확인하기');
      }
      return '';
    }
  };
  const content = readContent(detailPath);

  const matterData = matter(content);

  const htmlContent = await convertMarkdownToHtml(matterData.content);

  return {
    htmlContent,
    markdownContent: matterData.content,
    ...matterData.data,
  };
}
