# 4. URL

URI, URL, URN? 대체 무슨 차이 일까요? 🤔

## 4.1 **URI(Uniform Resource Identifier) : 통합 자원 식별자**

- URI는 위치(Locator), 이름(Name) 또는 둘 다 추가로 분류될 수 있습니다.

![](/images/basecamp-network/chapter04-1-1.png)

- **URI** (Uniform Resource Identifier)
    - **Uniform:** 리소스 식별하는 통일된 방식
    - **Resource:** 자원, URI로 식별할 수 있는 모든 것(제한 없음)
    - **Identifier:** 다른 항목과 구분하는데 필요한 정보
- **URL** (Uniform Resource Locator): 리소스가 있는 **위치**를 지정
- **URN** (Uniform Resource Name): 리소스에 **이름**을 부여

<aside>
💡 **위치(주소)는 변할 수 있지만, 이름은 변하지 않는다!**

ex)  Name : 위니브 / Locator : 제주 제주시 첨단로 330
⇒ “택시 기사님 `위니브`로 가주세요!“라고 말하면 주소가 변해도 이쪽으로 갑니다.

</aside>

## 4.2 **URL(Uniform Resource Locator)**

- 웹 사이트를 표시하기 위해 입력하는 주소를 말합니다.
- 자원이 어디 있는지를 알려주기 위한 규약입니다.
- 흔히 웹사이트 주소로 알고 있지만, **URL은 웹사이트 주소뿐만 아니라 컴퓨터 네트워크상의 자원을 모두 나타낼 수 있습니다.**

![](/images/basecamp-network/chapter04-1-2.png)

```
0번 ~ 1023번: 잘 알려진 포트 (well-known port)
1024번 ~ 49151번: 등록된 포트 (registered port)
49152번 ~ 65535번: 동적 포트 (dynamic port)
```

```jsx
WHATWG URL's origin property (https://nodejs.org/api/url.html#url)
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                              href                                              │
├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │          host          │           path            │ hash  │
│          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │    hostname     │ port │ pathname │     search     │       │
│          │  │                     │                 │      │          ├─┬──────────────┤       │
│          │  │                     │                 │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │    hostname     │ port │          │                │       │
│          │  │          │          ├─────────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │          host          │          │                │       │
├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
│   origin    │                     │         origin         │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
│                                              href                                              │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
```

## 4.3 실습

### 4.3.1 fragment에 따른 이동

```html
<a href="파일명_또는_경로명?key1=value1&key2=value2#section">링크</a>
```

```html
<a href="002.html?key1=value1&key2=value2#one">링크</a>
<a href="002.html?key1=value1&key2=value2#two">링크</a>
<section id="one">
    lorem*30
</section>
<section id="two">
    lorem*30
</section>
```

### 4.3.2 form에서 자신에게 데이터 전송

```html
<form action="" method="get">
    <input type="text" name="username" value="helloget">
    <input type="password" name="password" value="worldget">
    <input type="submit" value="Login">
</form>
```

### 4.3.3 Server에서 데이터 수신

```html
<form action="http://127.0.0.1:8000" method="get">
    <input type="text" name="username" value="helloget">
    <input type="password" name="password" value="worldget">
    <input type="submit" value="Login">
</form>
```

```python
from http.server import HTTPServer, BaseHTTPRequestHandler # 간단한 서버를 만들 수 있는 모듈
from urllib.parse import urlparse, parse_qs

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self): # get 요청 처리
        parsed_url = urlparse(self.path) # URL 파싱
        query_params = parse_qs(parsed_url.query) # 쿼리 파싱

        username = query_params.get('username', [None])[0] # username과 password 값을 가져옴. 값이 없는 경우 None이 기본값.
        password = query_params.get('password', [None])[0]

        if username and password: # 2개 모두 존재하는 경우
            response = f'Username: {username}, Password: {password}'
        else: # 그렇지 않은 경우에는 form
            response = '''
            <form action="" method="get">
                <input type="text" name="username" placeholder="Username">
                <input type="password" name="password" placeholder="Password">
                <input type="submit" value="Login">
            </form>
            '''

        self.send_response(200) # HTTP 상태코드 생성(200은 요청이 성공적으로 처리되었다는 것)
        self.send_header('Content-type', 'text/html') # 응답은 HTML로 송신
        self.end_headers() # 헤더 정보는 여기까지 마무리 하겠다는 것
        self.wfile.write(response.encode('utf-8')) # 응답 메시지 작성

if __name__ == '__main__':
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    print(f'Server running on port {server_address[1]}')
    httpd.serve_forever()
```

### 4.3.4 JavaScript의 URL 처리

**URL 파싱**

```jsx
const url = new URL('https://www.example.com/path/to/page?key1=value1&key2=value2#section');

console.log(url.protocol); // "https:"
console.log(url.hostname); // "www.example.com"
console.log(url.pathname); // "/path/to/page"
console.log(url.search);   // "?key1=value1&key2=value2"
console.log(url.hash);     // "#section"
```

**요청 보내기**

```jsx
const url = 'https://eduapi.weniv.co.kr/723/product';

fetch(`${url}`)
  .then(response => {
    console.log(response.status);
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

```jsx
const url = 'https://eduapi.weniv.co.kr/753/product/search';
const params = new URLSearchParams({ keyword: 'keyring' });

fetch(`${url}?${params}`)
  .then(response => {
    console.log(response.status);
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### 4.3.5 Python의 URL

**URL 파싱**

```python
from urllib.parse import urlparse

url = 'https://www.example.com/path/to/page?key1=value1&key2=value2#section'
parsed_url = urlparse(url)

print(parsed_url.scheme)  # "https"
print(parsed_url.netloc)  # "www.example.com"
print(parsed_url.path)    # "/path/to/page"
print(parsed_url.query)   # "key1=value1&key2=value2"
print(parsed_url.fragment)# "section"
```

**요청 보내기**

colab에서 실습하실 경우 설치 없이 해도 되고, 터미널에서 실행할 경우 `pip install requests` 하여 모듈을 설치해야 합니다.

```python
import requests

url = 'https://eduapi.weniv.co.kr/523/product/search'
params = {'keyword': 'keyring'}

response = requests.get(url, params=params)

print(response.status_code)
print(response.text)
```

### 4.3.6 Python의 URL 인코딩

URL 인코딩(URL Encoding)은 URL에서 특정 문자를 퍼센트 인코딩(Percent Encoding)으로 대체하는 과정을 말합니다. URL에는 ASCII 문자 중 예약 문자나 불안전한 문자가 포함될 수 있는데, 이러한 문자들은 URL에서 특별한 의미를 가지거나 올바르게 전송되지 않을 수 있습니다. 따라서 URL 인코딩을 통해 이러한 문자들을 안전하게 표현할 수 있도록 변환합니다.

URL 인코딩에서는 ASCII 문자 중 알파벳(A-Z, a-z), 숫자(0-9), 하이픈(-), 밑줄(_), 마침표(.), 물결표(~) 등은 그대로 유지되며, 그 외의 문자들은 퍼센트 기호(%)와 해당 문자의 ASCII 코드에 해당하는 16진수 값으로 대체됩니다.

```python
from urllib.parse import quote, unquote

# URL 인코딩 예제
url = "https://www.example.com/search?q=Hello World!&category=문서"
encoded_url = quote(url)

print("Original URL:", url)
print("Encoded URL:", encoded_url)

# URL 디코딩 예제
decoded_url = unquote(encoded_url)

print("Decoded URL:", decoded_url)
```
