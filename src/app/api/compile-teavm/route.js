import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { code } = await request.json();
    const TEAVM_PROJECT_PATH =
      process.env.TEAVM_PROJECT_PATH || '../teaVM-testing';
    const JAVA_SRC_PATH = path.join(TEAVM_PROJECT_PATH, 'src/main/java');

    // 1. Main 클래스 생성
    const mainJavaCode = `
    public class Main {
        public static void main(String[] args) {
            ${code}
        }
    }`;

    await fs.writeFile(path.join(JAVA_SRC_PATH, 'Main.java'), mainJavaCode);

    // 2. Maven으로 TeaVM 컴파일
    await new Promise((resolve, reject) => {
      exec(
        'mvn package',
        {
          cwd: TEAVM_PROJECT_PATH,
        },
        (error, stdout, stderr) => {
          if (error) {
            console.error('Maven build error:', stderr);
            reject(error);
            return;
          }
          resolve(stdout);
        },
      );
    });

    // 3. 컴파일된 classes.js 파일 읽기 및 수정
    const compiledJsPath = path.join(
      TEAVM_PROJECT_PATH,
      'target/generated/js/teavm/classes.js',
    );
    let jsContent = await fs.readFile(compiledJsPath, 'utf8');
    // B.main=C; 다음에 window.B=B; 추가
    jsContent = jsContent.replace('B.main=C;', 'B.main=C;\nwindow.B=B;');

    // 4. 수정된 파일 저장 및 복사
    const publicJsPath = path.join(process.cwd(), 'public/classes.js');
    await fs.writeFile(publicJsPath, jsContent);

    // source map 파일 복사
    const compiledMapPath = path.join(
      TEAVM_PROJECT_PATH,
      'target/generated/js/teavm/classes.js.map',
    );
    await fs.copyFile(
      compiledMapPath,
      path.join(process.cwd(), 'public/classes.js.map'),
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Compilation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
