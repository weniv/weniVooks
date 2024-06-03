const fs = require('fs');
const path = require('path');

const postsDirectory = path.join(process.cwd(), '_md', 'book');

export function getPages() {
  const result = [];

  const directories = fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const files = fs
    .readdirSync(postsDirectory)
    .filter((filename) => path.extname(filename) === '.md')
    .map((filename) => filename.replace(/\.md$/, ''));

  for (const directory of directories) {
    const chapterPath = path.join(postsDirectory, directory);
    const pages = fs
      .readdirSync(chapterPath)
      .filter((filename) => path.extname(filename) === '.md')
      .map((filename) => filename.replace(/\.md$/, ''));

    if (pages.length > 0) {
      for (const page of pages) {
        result.push({ chapter: directory, page });
      }
    } else {
      result.push({ chapter: directory });
    }
  }

  for (const file of files) {
    result.push({ chapter: file });
  }

  return result;
}
