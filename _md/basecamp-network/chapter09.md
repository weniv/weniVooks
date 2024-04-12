# 9. 상태 저장

웹 애플리케이션에서 상태를 저장하는 방법에는 크게 클라이언트 측에서 상태를 저장하는 방법과 서버 측에서 상태를 저장하는 방법이 있습니다. 클라이언트 측에서는 쿠키와 로컬 스토리지를 사용하고, 서버 측에서는 세션을 사용하는 것이 일반적입니다.

## 9.1 클라이언트 상태 저장

### 9.1.1 쿠키(Cookie)

쿠키는 웹 브라우저에 저장되는 작은 텍스트 파일로, 키-값 쌍으로 데이터를 저장합니다. 쿠키는 서버에서 설정하고 브라우저에 저장되며, 이후 브라우저가 서버에 요청을 보낼 때마다 쿠키를 함께 전송합니다.

쿠키는 브라우저에서 직접 수정하거나 접근하는 것이 허락되지 않습니다. **개발자 도구를 통해 거부되는 것을 확인**해보세요. `.html 파일`을 통해 실행되는 것을 확인해보세요. 이번에는 **쿠키가 저장되는 것을 확인**해보세요.

**JavaScript에서 쿠키를 설정하는 예제 코드**

```jsx
// 쿠키 설정
document.cookie = "username=jun";

// 쿠키 읽기
const cookieValue = document.cookie;
console.log(cookieValue);

```

**HTML에서 쿠키를 설정하는 예제 코드**

```jsx
<!DOCTYPE html>
<html>
<head>
    <title>쿠키 설정 예제</title>
</head>
<body>
    <h1>쿠키 설정 예제</h1>
    <button onclick="setCookie()">쿠키 설정</button>
    <button onclick="getCookie()">쿠키 읽기</button>

    <script>
        function setCookie() {
            document.cookie = "user=jun; age=10;";
            console.log("쿠키가 설정되었습니다.");
        }

        function getCookie() {
            const cookieValue = document.cookie;
            console.log("쿠키 값:", cookieValue);
        }
    </script>
</body>
</html>
```

**Python에서 쿠키를 설정하는 예제 코드**

```python
from http.server import HTTPServer, SimpleHTTPRequestHandler

class CookieHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/":
            self.send_response(200)
            self.send_header("Content-type", "text/html")

            # 쿠키 설정
            self.send_header(
                "Set-Cookie",
                f"username=jun;",
            )

            self.end_headers()
            self.wfile.write(b"<html><body><h1>Cookie has been set!</h1></body></html>")
        else:
            self.send_error(404)

def run(server_class=HTTPServer, handler_class=CookieHandler, port=8000):
    server_address = ("", port)
    httpd = server_class(server_address, handler_class)
    print(f"Starting server on port {port}...")
    httpd.serve_forever()

if __name__ == "__main__":
    run()
```

**요약**

- 쿠키는 키-값 쌍의 형태로 저장되며, 도메인 단위로 관리됩니다. 따라서 특정 도메인에서 발행한 쿠키는 해당 도메인 내에서만 유효합니다.
- 쿠키의 크기는 제한적이며, 보통 4KB 이하로 제한됩니다. 따라서 대량의 정보를 저장하기에는 적합하지 않습니다.
- 쿠키는 브라우저 종료가 될 때 사라지는 **세션 쿠키**와 만료 기간이 종료되어야만 사라지는 **영구 쿠키**가 있습니다.
- 쿠키는 서비스 운영자가 발행하는 **퍼스트 파티 쿠키**와 **서드 파티 쿠키**가 있는데 서드 파티 쿠키의 경우 광고 같은 곳에서 활용됩니다.
- 쿠키는 브라우저에 저장되기 때문에, 사용자가 쿠키를 삭제하거나 차단할 수 있습니다. 따라서 중요한 정보는 서버에서 관리하는 것이 좋습니다.
- 보안상 민감한 정보는 쿠키에 저장하지 않는 것이 좋습니다. 쿠키는 네트워크 상에서 평문으로 전송되므로, 중간에 탈취될 위험이 있기 때문입니다. 민감한 정보는 세션이나 토큰 등의 방식으로 서버에서 관리하는 것이 안전합니다. 쿠키는 CSRF(Cross-Site Request Forgery) 공격에 취약할 수 있습니다. CSRF 공격은 쿠키가 요청에 자동으로 포함되는 것을 이용하여 사용자가 로그인한 웹사이트의 권한을 도용하여, 사용자의 의도와는 무관하게 공격자가 원하는 요청을 수행하게 만드는 공격 방식입니다.

### 9.1.2 로컬 스토리지(Local Storage)

로컬 스토리지는 웹 브라우저에서 제공하는 저장소로, 키-값 쌍으로 데이터를 저장할 수 있습니다. 로컬 스토리지는 쿠키와 달리 서버로 전송되지 않으며, 웹 페이지가 닫혀도 데이터가 유지됩니다.

해당 예제는 콘솔창에서도 실행해볼 수 있습니다.

**JavaScript에서 로컬 스토리지를 사용하는 예제 코드**

```jsx
// 로컬 스토리지에 데이터 저장
localStorage.setItem('username', 'John Doe');

// 로컬 스토리지에서 데이터 읽기
const username = localStorage.getItem('username');
console.log(username);
```

**요약**

- 로컬스토리지는 브라우저에 데이터를 저장하는 웹 스토리지의 한 종류로, 쿠키와 달리 만료 기간이 없습니다. 명시적으로 삭제하지 않는 한 데이터가 영구적으로 보관됩니다.
- 로컬스토리지도 키-값 쌍의 형태로 데이터를 저장하며, 도메인 단위로 관리됩니다. 해당 도메인 내에서만 데이터에 접근할 수 있습니다.
- 로컬스토리지의 저장 용량은 브라우저마다 차이가 있지만, 일반적으로 5MB 이상을 제공합니다. 쿠키에 비해 훨씬 많은 양의 데이터를 저장할 수 있습니다.
- 로컬스토리지는 쿠키와 달리 서버로 자동 전송되지 않습니다. 필요한 경우 JavaScript를 통해 명시적으로 서버로 전송해야 합니다.
- 로컬스토리지는 사용자가 직접 삭제할 수 있으며, 브라우저 설정에서 데이터 저장을 차단할 수도 있습니다. 따라서 중요한 데이터는 서버에서 관리하는 것이 좋습니다.
- 로컬스토리지에 민감한 정보를 저장하는 것은 권장되지 않습니다. 로컬스토리지의 데이터는 JavaScript를 통해 접근할 수 있으므로, 크로스 사이트 스크립팅(XSS) 공격에 취약할 수 있기 때문입니다.

<aside>
💡 **CSRF 공격**

- 사용자의 권한을 도용하여, 사용자의 의도와 무관한 요청을 수행하게 만드는 공격입니다.
- 악성 스크립트가 아니라 일반 버튼을 위변조하여 만들어도 쿠키는 쉽게 얻을 수 있습니다.
- 공격자는 사용자가 로그인한 웹사이트의 쿠키를 이용하여, 위조된 요청을 전송합니다.
- 공격자는 직접 사용자의 데이터에 접근할 수 없지만, 사용자의 권한으로 원하는 동작을 수행할 수 있습니다.
- 주로 상태 변경 요청(글 작성, 삭제, 송금 등)을 목표로 합니다.

**XSS 공격**

- 악성 스크립트를 웹 페이지에 주입하여, 사용자의 브라우저에서 원치 않는 동작을 수행하게 만드는 공격입니다.
- 공격자는 웹 페이지에 악성 스크립트를 삽입하고, 사용자가 해당 페이지를 열면 스크립트가 실행됩니다.
- 공격자는 사용자의 쿠키, 세션, 개인 정보 등을 탈취할 수 있습니다.
- 주로 사용자의 데이터 탈취나 권한 상승 등을 목표로 합니다.

**예시**

[해킹대상 페이지](https://paullab.co.kr/DBD_001.html)

</aside>

## 9.2 서버 상태 저장

### 9.2.1 세션(Session)

세션은 서버 측에서 클라이언트의 상태를 유지하는 방법입니다. 세션은 일반적으로 서버의 메모리나 데이터베이스에 저장되며, 클라이언트에게는 세션 ID만 전달됩니다. 클라이언트는 세션 ID를 쿠키에 저장하고, 이후 서버에 요청을 보낼 때마다 세션 ID를 함께 전송합니다.

**Python에서 세션을 사용하는 예제 코드**

```python
import uuid
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import parse_qs

sessions = {}  # 세션 데이터를 저장할 딕셔너리

class SessionHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        print(sessions)
        session_id = self.get_session_id()
        if session_id not in sessions:
            sessions[session_id] = {"username": None}

        if self.path == "/":
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            if session_id not in self.headers.get("Cookie", ""):
                self.send_header("Set-Cookie", f"sessionid={session_id}")
            self.end_headers()
            self.wfile.write(b"<html><body>")
            if sessions[session_id]["username"]:
                self.wfile.write(
                    f"<h1>Welcome, {sessions[session_id]['username']}!</h1>".encode()
                )
            else:
                self.wfile.write(b'<form method="post" action="/login">')
                self.wfile.write(b'<input type="text" name="username">')
                self.wfile.write(b'<input type="submit" value="Login">')
                self.wfile.write(b"</form>")
            self.wfile.write(b"</body></html>")
        else:
            self.send_error(404)

    def do_POST(self):
        if self.path == "/login":
            content_length = int(self.headers["Content-Length"])
            post_data = self.rfile.read(content_length).decode("utf-8")
            username = parse_qs(post_data)["username"][0]
            session_id = self.get_session_id()
            sessions[session_id]["username"] = username
            self.send_response(302)
            self.send_header("Location", "/")
            self.end_headers()
        else:
            self.send_error(404)

    def get_session_id(self):
        if "Cookie" in self.headers:
            cookie = self.headers["Cookie"]
            if "sessionid" in cookie:
                return cookie.split("sessionid=")[1].split(";")[0]
        session_id = str(uuid.uuid4())
        return session_id

def run(server_class=HTTPServer, handler_class=SessionHandler, port=8000):
    server_address = ("", port)
    httpd = server_class(server_address, handler_class)
    print(f"Starting server on port {port}...")
    httpd.serve_forever()  # 서버 시작

if __name__ == "__main__":
    run()  # 직접 실행될 경우 서버 시작

```

- 로그인
- 로그인 후 세션 확인
- 세션 지워보기
- Network에 Request Header보기

클라이언트 측의 쿠키와 로컬 스토리지, 그리고 서버 측의 세션을 적절히 사용하면 웹 애플리케이션에서 상태를 유지하고 관리할 수 있습니다. 각 방법의 특성과 보안 고려사항을 이해하고, 애플리케이션의 요구사항에 맞게 선택하는 것이 중요합니다.
