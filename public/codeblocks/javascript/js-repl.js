class JsRepl extends HTMLElement {
  constructor() {
    super();
    this.content = this.textContent;
    this.result = '결과값';
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
  _execute() {
    try {
      const editor = this.querySelector('.codeblock-editor');
      const currentCode = editor ? editor.value : '';
      const result = new Function(currentCode)();
      this.result = result ? result : 'return값이 없습니다. 콘솔을 확인하세요';
      this._updateResult(this.result);
    } catch (error) {
      console.error('js 코드 실행 중 오류 발생:', error);
    }
  }
  _copyCodeToClipboard() {
    const editor = this.querySelector('.codeblock-editor');
    if (editor) {
      navigator.clipboard
        .writeText(editor.value)
        .then(() => {
          console.log('코드가 성공적으로 복사되었습니다.');
        })
        .catch((error) => {
          console.error('코드 복사 중 오류 발생:', error);
        });
    }
  }
  _createExecHeader() {
    const RUN_BUTTON = `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="15" fill="#2E6FF2"/>
      <path d="M19.7894 14.7052C20.0045 14.8429 20.0045 15.1571 19.7894 15.2948L12.0387 20.2552C11.8057 20.4043 11.5 20.237 11.5 19.9604L11.5 10.0395C11.5 9.76295 11.8057 9.59564 12.0387 9.74474L19.7894 14.7052Z" fill="white"/>
    </svg>`;
    const COPY_BUTTON = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.41667 2C2.53927 2 2 2.78089 2 3.51667V12.4833C2 13.2191 2.53927 14 3.41667 14H5.75V12.5H3.50097C3.50037 12.495 3.5 12.4895 3.5 12.4833V3.51667C3.5 3.51052 3.50037 3.50497 3.50097 3.5H11.999C11.9996 3.50497 12 3.51052 12 3.51667V5.25H13.5V3.51667C13.5 2.78089 12.9607 2 12.0833 2H3.41667ZM8.41667 6.5C7.6002 6.5 7 7.18409 7 7.95V17.05C7 17.8159 7.6002 18.5 8.41667 18.5H17.0833C17.8998 18.5 18.5 17.8159 18.5 17.05V7.95C18.5 7.18409 17.8998 6.5 17.0833 6.5H8.41667ZM17 17H8.5V8H17V17ZM15.5 10.75C15.5 11.1642 15.1642 11.5 14.75 11.5H10.75C10.3358 11.5 10 11.1642 10 10.75C10 10.3358 10.3358 10 10.75 10H14.75C15.1642 10 15.5 10.3358 15.5 10.75ZM14.75 15C15.1642 15 15.5 14.6642 15.5 14.25C15.5 13.8358 15.1642 13.5 14.75 13.5H10.75C10.3358 13.5 10 13.8358 10 14.25C10 14.6642 10.3358 15 10.75 15H14.75Z" fill="#8D9299"/>
    </svg>`;
    const header = document.createElement('div');
    header.classList.add('codeblock-header');
    const execBtn = this._createButton('codeblock-exec-button', RUN_BUTTON);
    execBtn.addEventListener('click', this._execute.bind(this));
    const copyBtn = this._createButton('codeblock-copy-button', COPY_BUTTON);
    copyBtn.addEventListener('click', this._copyCodeToClipboard.bind(this));
    header.append(execBtn, copyBtn);
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
      mode: 'javascript',
      smartIndent: true,
      lineNumbers: true,
      matchBrackets: true,
      autofocus: true,
      indentUnit: 2,
      theme: 'default',
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

  _updateResult(newValue) {
    const resultElement = this.querySelector('.codeblock-result p');
    if (resultElement) {
      resultElement.textContent = newValue;
    }
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

customElements.define('js-repl', JsRepl);
