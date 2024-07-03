const fs = require('fs');
const path = require('path');

export function getChapters(default_path) {
  const result = [];
  const postsDirectory = path.join(process.cwd(), '_md', default_path);

  const directories = fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const files = fs
    .readdirSync(postsDirectory)
    .filter((filename) => path.extname(filename) === '.md')
    .map((filename) => filename.replace(/\.md$/, ''));

  const allChapters = new Set([...directories, ...files]);

  allChapters.forEach((chapter) => {
    result.push({ chapter });
  });

  return result;
}
