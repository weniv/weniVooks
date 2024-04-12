# 3. HTML, CSS, JavaScript, Python

![HTML/CSS/JS](/images/basecamp-network/chapter03-1-1.gif)

![Python](/images/basecamp-network/chapter03-1-2.webp)

## 3.1 HTML(주로 FE)

- HyperText Markup Language
    - **HyperText**(하이퍼텍스트): 정해진 순서 없이, ‘참조’를 통해 한 문서에서 다른 문서로 이동할 수 있는 텍스트.
    - **Markup Language**(마크업 언어): 태그 등을 이용하여 문서나 데이터의 구조를 표시하는 언어
- HTML은 프로그래밍 언어가 아닌 콘텐츠의 구조를 정의하는 마크업 언어
- 웹을 이루는 가장 기초적인 구성 요소로, **웹 콘텐츠의 의미와 구조를 정의**
- 확장자 `.html`

```html
<h1>hello world</h1>
```

## 3.2 CSS(주로 FE)

- Cascading Style Sheets
- **웹 페이지의 모양/표현**
- 확장자 `.css`

```css
h1 {
    color: red;
}
```

## 3.3 JavaScript(주로 FE)

- **웹 페이지의 기능/동작**
- 확장자 `.js`

```jsx
window.alert('hello world') // 엄밀히 얘기하면 JS는 아니고 BOM이긴 합니다.
```

## 3.4 Python(주로 BE)

- **웹 페이지의 데이터 처리 담당**
- 눈에 보이지는 않지만 핵심 기능을 수행하고 처리하는 중요한 역할을 수행
- 데이터 처리 및 수행: 두뇌, 심장, 폐, 간
- 보안: 면역계
- 확장자 `.py` (백엔드는 더 다양한 언어로 처리가 가능합니다.)

```python
from http.server import BaseHTTPRequestHandler, HTTPServer
import os

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'

        try:
            file_to_open = open(self.path[1:]).read()
            self.send_response(200)
        except:
            file_to_open = "File not found"
            self.send_response(404)

        self.end_headers()
        self.wfile.write(bytes(file_to_open, 'utf-8'))

def run(port=8080):
    server_address = ('', port)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    print(f'Server running on port {port}')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
```