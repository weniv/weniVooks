class JavaRepl extends HTMLElement {
  constructor() {
    super();
    this.content = this.textContent;
    this.result = '실행중...';
    this.isExecuting = false; // 실행 상태 관리
  }

  connectedCallback() {
    const box = this._createBox();
    this.appendChild(box);
  }

  _createBox() {
    const box = document.createElement('div');
    box.classList.add('codeblock-wrap');
    const header = this._createExecHeader();
    const editor = this._createEditor();
    const result = this._createResult();
    box.append(header, editor, result);
    return box;
  }

  async _execute() {
    if (this.isExecuting) {
      this._updateResult('이미 실행 중입니다...');
      return;
    }

    try {
      this.isExecuting = true;
      this._updateResult('컴파일 중...');

      // 현재 코드 가져오기
      const javaCode = this._getCurrentCode();
      if (!javaCode.trim()) {
        throw new Error('실행할 코드가 없습니다.');
      }

      // 컴파일 요청
      const response = await fetch('/api/compile-teavm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: javaCode }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`컴파일 실패: ${error}`);
      }

      this._updateResult('실행 중...');
      await this._loadAndExecute();
    } catch (error) {
      console.error('실행 오류:', error);
      this._updateResult(`오류: ${error.message}`);
    } finally {
      this.isExecuting = false;
    }
  }

  async _loadAndExecute() {
    try {
      // 이전 script 태그 제거
      const oldScript = document.querySelector('script[data-teavm]');
      if (oldScript) oldScript.remove();

      // 새로운 classes.js 로드 (Promise로 로딩 완료 대기)
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `/classes.js?t=${Date.now()}`; // 캐시 방지
        script.setAttribute('data-teavm', 'true');

        script.onload = () => {
          // window.B 객체가 제대로 초기화되었는지 확인
          if (window.B && typeof window.B.main === 'function') {
            resolve();
          } else {
            reject(new Error('Failed to initialize Java runtime'));
          }
        };

        script.onerror = () =>
          reject(new Error('Failed to load compiled code'));
        document.body.appendChild(script);
      });

      // 출력 캡처 설정
      window.$rt_putStdoutCustom = (message) => {
        this._updateResult(message);
      };

      // 코드 실행
      window.B.main();
    } catch (error) {
      throw new Error(`Execution failed: ${error.message}`);
    }
  }

  _getCurrentCode() {
    const editor = this.querySelector('.codeblock-editor');
    return editor ? editor.value : '';
  }

  _updateResult(newValue) {
    const resultElement = this.querySelector('.codeblock-result p');
    if (resultElement) {
      resultElement.textContent = newValue;
      // 오류 메시지인 경우 스타일 변경
      if (newValue.startsWith('오류:')) {
        resultElement.classList.add('error');
      } else {
        resultElement.classList.remove('error');
      }
    }
  }

  _createExecHeader() {
    const RUN_BUTTON = `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="30" rx="15" fill="#2E6FF2"/>
        <path d="M19.7894 14.7052C20.0045 14.8429 20.0045 15.1571 19.7894 15.2948L12.0387 20.2552C11.8057 20.4043 11.5 20.237 11.5 19.9604L11.5 10.0395C11.5 9.76295 11.8057 9.59564 12.0387 9.74474L19.7894 14.7052Z" fill="white"/>
      </svg>`;

    const header = document.createElement('div');
    header.classList.add('codeblock-header');
    const execBtn = this._createButton('codeblock-exec-button', RUN_BUTTON);
    execBtn.addEventListener('click', this._execute.bind(this));
    header.appendChild(execBtn);
    return header;
  }

  _createButton(className, innerHTML) {
    const button = document.createElement('button');
    button.classList.add(className);
    button.innerHTML = innerHTML;
    return button;
  }

  _createEditor() {
    const editor = document.createElement('textarea');
    editor.classList.add('codeblock-editor');
    editor.value = this.content;

    const options = {
      mode: 'text/x-java',
      theme: 'default',
      lineNumbers: true,
      matchBrackets: true,
      indentUnit: 4,
      styleActiveLine: true,
    };

    setTimeout(() => {
      const cm = CodeMirror.fromTextArea(editor, options);
      cm.on('change', (instance) => {
        editor.value = instance.getValue();
      });
    }, 0);

    this.textContent = '';
    return editor;
  }

  _createResult() {
    const resultBox = document.createElement('div');
    resultBox.classList.add('codeblock-result');
    const result = document.createElement('p');
    result.textContent = this.result;
    resultBox.appendChild(result);
    return resultBox;
  }
}

// 웹 컴포넌트 등록
customElements.define('java-repl', JavaRepl);
