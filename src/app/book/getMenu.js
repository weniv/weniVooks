import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { TITLE, CHAPTER_TITLE } from './data';

const postsDirectory = path.join(process.cwd(), '_md');

function getDirectoryStructure(dirPath) {
  const data = {
    title: CHAPTER_TITLE[path.basename(dirPath)] || path.basename(dirPath),
    link: `/${path.relative(postsDirectory, dirPath).replace(/\\/g, '/')}`,
    sections: [],
  };

  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      data.sections.push(getDirectoryStructure(filePath));
    } else if (file.endsWith('.md')) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(fileContents);
      const { title } = frontmatter;

      data.sections.push({
        title: title || file.replace('.md', ''),
        link: `${data.link}/${file.replace('.md', '')}`,
      });
    }
  }

  return data;
}

export async function getMenu(dirPath) {
  const allPath = `${postsDirectory}/${dirPath}`;

  const data = {
    title: TITLE,
    link: `/${dirPath}`,
    sections: [],
  };

  const files = fs.readdirSync(allPath);

  for (const file of files) {
    const filePath = path.join(allPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      data.sections.push(getDirectoryStructure(filePath));
    } else if (file.endsWith('.md')) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(fileContents);
      const { title } = frontmatter;

      data.sections.push({
        title: title || file.replace('.md', ''),
        link: `${data.link}/${file.replace('.md', '')}`,
      });
    }
  }

  return data;
}
