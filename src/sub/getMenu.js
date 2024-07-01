import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), '_md');

export function getMenu(DEFAULT_PATH, TITLE) {
  const allPath = `${postsDirectory}/${DEFAULT_PATH}`;

  const data = {
    title: TITLE,
    link: `/${DEFAULT_PATH}`,
    sections: [],
  };

  const files = fs.readdirSync(allPath);

  for (const file of files) {
    const filePath = path.join(allPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      data.sections.push(getDirectoryStructure(filePath));
    } else if (file.endsWith('.md')) {
      data.sections.push(getFileStructure(filePath, data.link));
    }
  }

  return data;
}

function getDirectoryStructure(dirPath) {
  const files = fs.readdirSync(dirPath);
  let chapterInfo = null;

  // Find the first .md file to extract chapter information
  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = path.join(dirPath, file);
      chapterInfo = getChapterInfo(filePath);
      break;
    }
  }

  const data = {
    title: chapterInfo ? chapterInfo.chapter : path.basename(dirPath),
    link: `/${path.relative(postsDirectory, dirPath).replace(/\\/g, '/')}`,
    sections: [],
  };

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      data.sections.push(getDirectoryStructure(filePath));
    } else if (file.endsWith('.md')) {
      data.sections.push(getFileStructure(filePath, data.link));
    }
  }

  return data;
}

function getFileStructure(filePath, parentLink) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter } = matter(fileContents);
  const { title, chapter } = frontmatter;

  return {
    title: title || path.basename(filePath).replace('.md', ''),
    link: `${parentLink}/${path.basename(filePath).replace('.md', '')}`,
    chapter: chapter || null,
  };
}

function getChapterInfo(filePath) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter } = matter(fileContents);
  const { chapter } = frontmatter;

  return { chapter: chapter || null };
}
