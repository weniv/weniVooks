# 5. HTTP란?

- HTTP(HyperText Transfer Protocol) : 클라이언트와 서버 간에 데이터를 주고받기 위한 약속(프로토콜)입니다.

<aside>
💡 **Protocol(프로토콜)** : 약속
- 데이터가 전송되는 방식을 결정하는 규약입니다.
- 송/수신자 사이의 합의를 통해 ‘데이터 포맷, 오류 제어 등의 규칙은 우리가 서로 **합의한 형식**으로 주고받자!’와 같이 서로 통신할 때 이해할 수 있는 규칙을 만든 것을 의미합니다.

</aside>

- 웹에서 이뤄지는 데이터 통신의 기초. 주로 TCP를 사용.
- 버전 : **HTTP/1.1**
    - 1997년에 공개된 버전으로, 현재 가장 많이 사용되는 버전입니다.
    - RFC(Request for Comments)는 인터넷 표준을 정의하는 문서 시리즈입니다.
        - RFC2068(1997년)부터 계속 발전해왔습니다.
    - 현재 HTTP/2(2015년), HTTP/3(2022년)가 개발되었고 점진적으로 도입 중에 있습니다.
- HTML, XML, Javascript, 오디오, 비디오, 이미지, PDF, Etc
    - 주고 받는 데이터는 개발자도구의 Network 탭에서 확인할 수 있습니다.
- HTTP 요청과 응답은 `요청 또는 상태 라인 / 해더(생략가능) / 빈줄(해더의 끝) / 바디(생략가능)` 의 형식을 따릅니다.
    
    <aside>
    💡 상세 내용은 메시지 구조 챕터에서 다룹니다. 형태만 봐주세요.
    
    </aside>
    
    ![](/images/basecamp-network/chapter05-1-1.png)
    
    - HTTP 요청 메시지 구조
        
        ```html
        GET /index.html HTTP/1.1
        Host: www.example.com
        User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/93.0
        Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
        Accept-Language: en-US,en;q=0.5
        Accept-Encoding: gzip, deflate, br
        Connection: keep-alive
        ```
        
        - 요청 라인: `GET /index.html HTTP/1.1`
        - 헤더: `Host`, `User-Agent`, `Accept`, `Accept-Language`, `Accept-Encoding`, `Connection`
        - 빈 줄: 헤더 다음의 빈 줄
        - 바디: 이 GET 요청에는 바디가 없습니다.
    - HTTP 응답 메시지 구조
        
        ```html
        HTTP/1.1 200 OK
        Date: Fri, 29 Mar 2023 10:30:00 GMT
        Server: Apache/2.4.41 (Ubuntu)
        Last-Modified: Thu, 28 Mar 2023 12:00:00 GMT
        Content-Type: text/html
        Content-Length: 1234
        Connection: keep-alive
        
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Example Page</title>
        </head>
        <body>
            <h1>Welcome to Example Page</h1>
            <p>This is a sample HTML page.</p>
        </body>
        </html>
        ```
        
        - 상태 라인: `HTTP/1.1 200 OK`
        - 헤더: `Date`, `Server`, `Last-Modified`, `Content-Type`, `Content-Length`, `Connection`
        - 빈 줄: 헤더 다음의 빈 줄
        - 바디: HTML 내용
- **HTTPS** (*HTTP + Secure*)

- 요청 라인, 상태 라인, 헤더 정보 상세
    
    HTTP 헤더에 들어가는 정보의 상세입니다. 
    이것을 다 외우기 보다는 필요할 때 하나씩 찾아서 공부하시는 것을 권합니다.
    
    뒤에서 상세히 다루는 내용도 포함되어 있습니다.
    
    - 요청 라인
        - HTTP 요청 메시지의 첫 번째 줄로, 클라이언트가 서버에 요청하는 내용을 나타냅니다.
        - 구성 요소: HTTP 메서드, 요청 대상(Request-URI), HTTP 버전
        - HTTP 메서드: 수행할 작업의 종류를 나타냅니다. GET, POST, PUT, DELETE 등이 있습니다.
        - 요청 대상(Request-URI): 요청하는 리소스의 경로를 나타냅니다. 절대 경로, 상대 경로 또는 절대 URI 형태로 표현될 수 있습니다.
        - HTTP 버전: 사용 중인 HTTP 프로토콜의 버전을 나타냅니다. 예: HTTP/1.1, HTTP/2
    - 상태 라인
        - HTTP 응답 메시지의 첫 번째 줄로, 요청에 대한 서버의 처리 결과를 나타냅니다.
        - 구성 요소: HTTP 버전, 상태 코드(Status Code), 상태 메시지(Reason Phrase)
        - HTTP 버전: 사용 중인 HTTP 프로토콜의 버전을 나타냅니다.
        - 상태 코드(Status Code): 요청 처리 결과를 나타내는 3자리 숫자입니다. 1xx(정보), 2xx(성공), 3xx(리다이렉션), 4xx(클라이언트 오류), 5xx(서버 오류) 등의 범주가 있습니다.
        - 상태 메시지(Reason Phrase): 상태 코드에 대한 간략한 설명입니다.
    - 헤더 정보
        1. Date: 서버가 응답을 생성한 날짜와 시간을 나타냅니다. RFC 1123 형식으로 표시됩니다. 예: `Date: Fri, 29 Mar 2023 10:30:00 GMT`
        2. Server: 서버 소프트웨어의 이름과 버전을 나타냅니다. 서버 식별에 사용될 수 있습니다. 예: `Server: Apache/2.4.41 (Ubuntu)`
        3. Last-Modified: 요청된 리소스가 마지막으로 수정된 날짜와 시간을 나타냅니다. 캐싱과 조건부 요청에 사용됩니다. 예: `Last-Modified: Thu, 28 Mar 2023 12:00:00 GMT`
        4. Content-Type: 응답 본문의 미디어 타입을 나타냅니다. MIME 타입과 문자 인코딩 정보를 포함할 수 있습니다. 예: `Content-Type: text/html; charset=UTF-8`
        5. Content-Length: 응답 본문의 바이트 길이를 나타냅니다. 이 정보를 통해 클라이언트는 전송 완료 여부를 알 수 있습니다. 예: `Content-Length: 1234`
        6. Connection: 현재 전송 완료 후 네트워크 접속을 유지할지 또는 닫을지를 나타냅니다. `keep-alive` 또는 `close` 값을 가질 수 있습니다. 예: `Connection: keep-alive`
        7. Accept: 클라이언트가 허용할 수 있는 컨텐츠 타입을 나타냅니다. 콤마로 구분된 MIME 타입 목록입니다. 예: `Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8`
        8. Accept-Language: 클라이언트가 선호하는 언어를 나타냅니다. 서버는 이 정보를 사용하여 다국어 콘텐츠를 제공할 수 있습니다. 예: `Accept-Language: en-US,en;q=0.5`
        9. Accept-Encoding: 클라이언트가 허용할 수 있는 콘텐츠 인코딩 방식을 나타냅니다. 압축 알고리즘(gzip, deflate 등)이 사용됩니다. 예: `Accept-Encoding: gzip, deflate, br`
        10. User-Agent: 클라이언트 소프트웨어(웹 브라우저 등)의 이름과 버전을 나타냅니다. 서버는 이 정보를 사용하여 클라이언트에 맞는 콘텐츠를 제공할 수 있습니다. 예: `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/93.0`

## 5.1 실습

### 5.1.1 Python 서버 구동

```python
import socket
import json
from http.server import BaseHTTPRequestHandler, HTTPServer

class CustomHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-type", "text/plain")  # 실습1
        # self.send_header("Content-type", "text/html")  # 실습2
        # -- 실습3 --
        # data = { # 실습3
        #     "message": "Hello, World!",
        #     "status": "success"
        # }
        # json_data = json.dumps(data)
        # self.send_header('Content-type', 'application/json')
        # -- //실습3 --
        self.end_headers()
        self.wfile.write(b"<h1>Hello, World!</h1>")
        # self.wfile.write(json_data.encode()) # 실습3

        print(
            f"Received GET request from {self.client_address[0]}:{self.client_address[1]}"
        )
        print(f"Request Headers:\n{self.headers}")
        print(f"Request Method: {self.command}")
        print(f"Request Path: {self.path}")
        print(f"Request Version: {self.request_version}")

    def do_POST(self):
        content_length = int(self.headers["Content-Length"])
        post_data = self.rfile.read(content_length)

        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        # self.send_header("Content-type", "text/plain") # 실습1
        # self.send_header("Content-type", "text/html") # 실습2
        self.send_header("Content-type", "application/json")
        self.end_headers()
        # self.wfile.write(b"Received POST request") # 실습1
        # self.wfile.write(b"<h1>Hello, World!</h1>") # 실습2
        data = {"message": "Received POST request", "status": "success"}
        json_data = json.dumps(data)
        self.wfile.write(json_data.encode())

        print(
            f"Received POST request from {self.client_address[0]}:{self.client_address[1]}"
        )
        print(f"Request Headers:\n{self.headers}")
        print(f"Request Method: {self.command}")
        print(f"Request Path: {self.path}")
        print(f"Request Version: {self.request_version}")
        print(f"Request Body:\n{post_data.decode()}")

def run_server(port=8000):
    server_address = ("", port)
    httpd = HTTPServer(server_address, CustomHTTPRequestHandler)
    print(f"Starting server on port {port}")
    httpd.serve_forever()

if __name__ == "__main__":
    run_server()

```

- http://127.0.0.1:8000/ 에 접속하여 HTML이 어떻게 접속되는지 확인
- header와 method 확인

### 5.1.2 HTML/JavaScript 코드를 통해 요청(request)

주로 HTML이나 JavaScript에서 서버로 통신을 보내기에 이번 챕터에서는 Python으로 실습하진 않습니다. 

- 아래 JavaScript 코드로 GET을 보내는 것 확인
    
    ```jsx
    fetch('http://127.0.0.1:8000/')
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => console.error(error));
    ```
    
- 아래 JavaScript 코드로 POST를 보내는 것 확인
    
    ```jsx
    fetch('http://127.0.0.1:8000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: 'test',
            content: 'test',
        }),
    })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => console.error(error));
    ```
    
- 아래 HTML 코드로 GET과 POST를 보내는 것 확인
    
    ```jsx
    <h2>POST</h2>
    <form action="http://127.0.0.1:8000" method="post">
        <input type="text" name="username" value="hellopost">
        <input type="password" name="password" value="worldpost">
        <input type="submit" value="Login">
    </form>
    
    <h2>GET</h2>
    <form action="http://127.0.0.1:8000" method="get">
        <input type="text" name="username" value="helloget">
        <input type="password" name="password" value="worldget">
        <input type="submit" value="Login">
    </form>
    ```
    