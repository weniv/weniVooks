import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), '_md');

export function getMenu(DEFAULT_PATH, TITLE, CHAPTER_TITLE) {
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
      data.sections.push(getDirectoryStructure(filePath, CHAPTER_TITLE));
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

function getDirectoryStructure(dirPath, CHAPTER_TITLE) {
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
