class htmlcssEditor extends HTMLElement {
  constructor() {
    super();
    this.html = this.dataset.html;
    this.css = this.dataset.css;
  }

  connectedCallback() {
    const container = this._createBox();
    this.appendChild(container);
  }

  // container 생성 - tab, editor, preview
  _createBox() {
    const container = document.createElement('div');
    container.classList.add('htmlcss-container');
    const editorWrap = document.createElement('div');
    editorWrap.classList.add('editor-wrap');
    const tabs = this._createTabs();
    const htmlEditor = this._createEditor('html');
    const cssEditor = this._createEditor('css');

    // 미리보기영역
    const preview = this._createPreview();

    editorWrap.append(tabs, htmlEditor, cssEditor);

    container.append(editorWrap, preview);
    return container;
  }

  // 탭
  _createTabs() {
    const tabWrap = document.createElement('div');
    tabWrap.classList.add('editor-header');

    const tabs = document.createElement('div');
    tabs.classList.add('editor-tab');
    const htmlTab = document.createElement('button');
    htmlTab.textContent = 'HTML';
    htmlTab.classList.add('tab-btn');

    htmlTab.addEventListener('click', (e) => {
      htmlTab.classList.add('active');
      cssTab.classList.remove('active');

      const htmlEditor = e.currentTarget
        .closest('.editor-wrap')
        .querySelector(`.html-editor`);
      const cssEditor = e.currentTarget
        .closest('.editor-wrap')
        .querySelector(`.css-editor`);

      htmlEditor.classList.remove('hide');
      cssEditor.classList.add('hide');
    });

    const cssTab = document.createElement('button');
    cssTab.textContent = 'CSS';
    cssTab.classList.add('tab-btn');

    cssTab.addEventListener('click', (e) => {
      htmlTab.classList.remove('active');
      cssTab.classList.add('active');

      const htmlEditor = e.currentTarget
        .closest('.editor-wrap')
        .querySelector(`.html-editor`);
      const cssEditor = e.currentTarget
        .closest('.editor-wrap')
        .querySelector(`.css-editor`);

      htmlEditor.classList.add('hide');
      cssEditor.classList.remove('hide');
    });

    if (this.dataset.html !== '') {
      // html 활성화
      htmlTab.classList.add('active');
    } else {
      cssTab.classList.add('active');
    }

    // 복사버튼
    const copyBtn = this._createButton();
    copyBtn.addEventListener('click', this._copyCodeToClipboard.bind(this));

    tabs.append(htmlTab, cssTab);
    tabWrap.append(tabs, copyBtn);
    return tabWrap;
  }

  _createButton() {
    const button = document.createElement('button');
    button.classList.add('copy-btn');
    button.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.41667 2C2.53927 2 2 2.78089 2 3.51667V12.4833C2 13.2191 2.53927 14 3.41667 14H5.75V12.5H3.50097C3.50037 12.495 3.5 12.4895 3.5 12.4833V3.51667C3.5 3.51052 3.50037 3.50497 3.50097 3.5H11.999C11.9996 3.50497 12 3.51052 12 3.51667V5.25H13.5V3.51667C13.5 2.78089 12.9607 2 12.0833 2H3.41667ZM8.41667 6.5C7.6002 6.5 7 7.18409 7 7.95V17.05C7 17.8159 7.6002 18.5 8.41667 18.5H17.0833C17.8998 18.5 18.5 17.8159 18.5 17.05V7.95C18.5 7.18409 17.8998 6.5 17.0833 6.5H8.41667ZM17 17H8.5V8H17V17ZM15.5 10.75C15.5 11.1642 15.1642 11.5 14.75 11.5H10.75C10.3358 11.5 10 11.1642 10 10.75C10 10.3358 10.3358 10 10.75 10H14.75C15.1642 10 15.5 10.3358 15.5 10.75ZM14.75 15C15.1642 15 15.5 14.6642 15.5 14.25C15.5 13.8358 15.1642 13.5 14.75 13.5H10.75C10.3358 13.5 10 13.8358 10 14.25C10 14.6642 10.3358 15 10.75 15H14.75Z" fill="#8D9299"/>
  </svg>`;
    return button;
  }

  // 에디터 생성
  _createEditor(mode) {
    const editor = document.createElement('textarea');
    editor.classList.add(`${mode}-editor`);
    editor.value = this[mode];
    if (mode === 'css' && this.dataset.html !== '') {
      editor.classList.add('hide');
    }

    const options = (mode) => {
      return {
        mode: mode === 'html' ? 'xml' : 'css',
        smartIndent: true,
        lineNumbers: true,
        matchBrackets: true,
        autofocus: true,
        indentUnit: 2,
        theme: 'default',
        styleActiveLine: true,
      };
    };

    setTimeout(() => {
      // 코드미러
      const cm = CodeMirror.fromTextArea(editor, options(mode));

      cm.on('change', (instance) => {
        editor.value = instance.getValue();
        const currentCode = this.querySelector(`.${mode}-editor`)?.value || '';

        this._updateResult(mode, currentCode);
      });
    }, 0);

    this[mode] = '';
    return editor;
  }

  _updateResult(mode, newValue) {
    const resultElement = this.querySelector('.htmlcssPreview');
    let cssCode = this.querySelector(`.css-editor`).value;
    let htmlCode = this.querySelector(`.html-editor`).value;

    if (mode == 'css') {
      cssCode = newValue;
    } else {
      htmlCode = newValue;
    }
    if (resultElement) {
      resultElement.srcdoc = `<html><style>${cssCode}</style><body>${htmlCode}</body></html>`;
    }
  }

  _createPreview() {
    const previewWrap = document.createElement('div');
    previewWrap.classList.add('preview-wrap');
    const title = document.createElement('p');
    title.classList.add('preview-title');
    title.textContent = 'Preview';
    const previewBox = document.createElement('iframe');
    previewBox.classList.add('htmlcssPreview');
    previewBox.title = 'preview';
    previewBox.sandbox = 'allow-scripts';
    previewBox.srcdoc = `<html><style>${this.dataset.css}</style><body>${this.dataset.html}</body></html>`;

    previewWrap.append(title, previewBox);

    return previewWrap;
  }

  // 복사기능
  _copyCodeToClipboard(e) {
    const mode = e.currentTarget
      .closest('.editor-header')
      .querySelector('.active')
      .textContent.toLowerCase();

    const editor = this.querySelector(`.${mode}-editor`);
    if (editor) {
      navigator.clipboard
        .writeText(editor.value)
        .then(() => {
          alert('코드가 성공적으로 복사되었습니다.');
        })
        .catch((error) => {
          alert('코드 복사 중 오류 발생:', error);
        });
    }
  }
}
customElements.define('html-css', htmlcssEditor);
