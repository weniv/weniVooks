# 6. HTTP 메시지 구조

우리 수업에서는 실습하진 않지만 아래와 같은 툴로 브라우저를 통하지 않고 직접 왔다 갔다 하는 Request와 Response를 전부 볼 수 있습니다.

[(부록) 와이어샤크(Wireshark)](https://paullabworkspace.notion.site/Wireshark-15522dde8f834a45ab912e48d7808f6c?pvs=4) 

**메시지 구조**

```
GET /index.html HTTP/1.1              # 요청라인
user-agent: MSIE 6.0; Windows NT 5.0  # 헤더
accept: text/html; */*
cookie: name = value
referer: http://www.naver.com
host: www.paullab.co.kr
```

```html
HTTP/1.1 200 OK                       # 응답라인
Server: Apache/2.4.41 (Ubuntu)        # 헤더
Content-Type: text/html; charset=UTF-8
Content-Length: 1024
Date: Mon, 01 Apr 2024 10:30:00 GMT
                                      # 빈줄
<!DOCTYPE html>                       # 본문
<html>
<head>
  <title>Example Page</title>
</head>
<body>
  <h1>Welcome to Example Page</h1>
  <p>This is an example HTTP response.</p>
</body>
</html>
```

**실제 요청과 응답**

![](/images/basecamp-network/chapter06-1-1.png)

**응답 코드도 가져올 수 있습니다.**

![](/images/basecamp-network/chapter06-1-2.png)

## 6.1 Request

```
GET /index.html HTTP/1.1
user-agent: MSIE 6.0; Windows NT 5.0
accept: text/html; */*
cookie: name = value
referer: http://www.naver.com
host: www.paullab.co.kr
```

1. 요청 라인
    1. 데이터 처리 방식(요청 메서드)
    2. 요청 페이지
    3. 프로토콜 버전
2. Header
    1. **User-Agent**: 사용자 웹 브라우저 종류 및 버전 정보.
    2. **Accept:** 웹 서버로부터 수신되는 데이터 중 웹 브라우저가 처리할 수 있는 데이터 타입을 의미. 
        
        여기서 text/html은 text, html 형태의 문서를 처리할 수 있고,  */*는 모든 문서를 처리할 수 있다는 의미. (이를 MIME 타입이라 부르기도 한다.)
        
    3. **Cookie:** HTTP 프로토콜 자체가 세션을 유지하지 않는 State-less(접속상태를 유지하지 않는) 방식이기 때문에 로그인 인증을 위한 사용자 정보를 기억하려고 만든 인위적인 값. 즉 사용자가 정상적인 로그인 인증 정보를 가지고 있다는 것을 판단하고자 사용.
        
        <aside>
        💡 접속 상태에 대한 내용을 후반부에 다루게 됩니다.
        
        </aside>
        
    4. **Referer:** 현재 페이지 접속 전에 어느 사이트를 경유했는지 알려주는 도메인 혹은 URL 정보.
    5. **Host:** 사용자가 요청한 도메인 정보.

<aside>
💡 request header 부분은 통신에서 필요한 경우 아래 fetch의 옵션으로 넣어야 하는 값입니다.

```jsx
fetch(`${URL}`, {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify(data),
})
```

</aside>

### 6.1.1 HTTP 요청 메서드

| GET | 리소스 취득 (? 뒤에 이어붙이는 방식 - 작은 값들) |
| --- | --- |
| POST | 리소스 생성 (Body에 붙이는 방식 - 상대적으로 큰 용량) |
| PUT | 리소스의 모든 것을 업데이트 |
| DELETE | 리소스 삭제  |
| PATCH | 리소스의 일부를 업데이트 |
| HEAD | HTTP 헤더 정보만 요청, 해당 자원 존재 여부 확인 목적.
GET과 비슷하지만 Response Body를 반환하지 않음. |
| OPTIONS | 웹서버가 지원하는 메소드 종류 반환 요청 |
| TRACE | 요청 리소스가 수신되는 경로 확인 |
| CONNECT | 요청 리소스에 대해 양방향 연결 시작 |

### 6.1.2 HTTP 요청 메서드 실습

실습을 위해 미리 준비된 서버를 사용하겠습니다. 이러한 서버를 모의(Mock) 서버라고 합니다. 모의 서버는 실제 서버와 동일한 API를 제공하지만, 데이터베이스 대신 가짜 데이터를 사용합니다. 이를 통해 프론트엔드 개발자는 백엔드 개발이 완료되기 전에도 API와의 통신을 테스트할 수 있습니다. 다양한 라이브러리와 프레임워크에서 모의 서버를 제공하며, 필요에 따라 직접 설정할 수도 있습니다.

[(부록) json-server로 Mock 서버 세팅](https://paullabworkspace.notion.site/json-server-Mock-a0d0afb418d34120948e94eb86390f92?pvs=4)

**GET: 서버! 네가 가진 정보를 줘!**

GET 메서드는 서버에 특정 리소스를 요청할 때 사용됩니다. 요청 패킷의 구조는 다음과 같습니다.

```
GET /753/product HTTP/1.1
Host: https://eduapi.weniv.co.kr/
```

- `GET`: HTTP 요청 메서드를 나타냅니다. 이 예시에서는 GET 메서드를 사용하여 리소스를 요청합니다.
- `/753/product`: 요청하려는 리소스의 경로를 나타냅니다. 이 경로는 서버에서 제공하는 API의 엔드포인트에 해당합니다. 여기서 753번은 다양한 사람들이 실습을 할 수 있도록 저희쪽에서 세팅해놓은 임의의 값입니다. 1 ~ 1000번까지 사용이 가능합니다.
- `HTTP/1.1`: 사용 중인 HTTP 버전을 나타냅니다.
- `Host: https://eduapi.weniv.co.kr/`: 요청을 보내는 서버의 호스트 이름과 포트 번호를 나타냅니다.

JavaScript의 Fetch API를 사용하여 GET 요청을 보내는 예시 코드는 다음과 같습니다.

```jsx
fetch('https://eduapi.weniv.co.kr/753/product', {
  method: 'GET'
})
.then(response => response.json())
.then(data => {
  console.log('성공:', data);
})
.catch(error => {
  console.error('실패:', error);
});
```

**6.4 POST: 서버! 새로운 상품 정보를 줄게! 데이터를 생성해줘!**

POST 메서드는 서버에 새로운 리소스를 생성할 때 사용됩니다. 요청 패킷의 구조는 다음과 같습니다.

```
POST /753/product HTTP/1.1
Host: https://eduapi.weniv.co.kr/
Content-Type: application/json
Content-Length: 1560
```

- `POST`: HTTP 요청 메서드를 나타냅니다. 이 예시에서는 POST 메서드를 사용하여 새로운 리소스를 생성합니다.
- `/753/product`: 생성하려는 리소스의 경로를 나타냅니다. 이 경로는 서버에서 제공하는 API의 엔드포인트에 해당합니다.
- `HTTP/1.1`: 사용 중인 HTTP 버전을 나타냅니다.
- `Host: https://eduapi.weniv.co.kr/`: 요청을 보내는 서버의 호스트 이름과 포트 번호를 나타냅니다.
- `Content-Type: application/json`: 요청 본문의 타입을 나타냅니다. 이 예시에서는 JSON 형식의 데이터를 전송합니다.
- `Content-Length: 1560`: 요청 본문의 길이를 나타냅니다. 이 값은 실제 전송되는 데이터의 바이트 수와 일치해야 합니다.

```jsx
const data = {
        "id": 8,
        "productName": "hello world keyring",
        "price": 12500,
        "stockCount": 100,
        "thumbnailImg": "asset/products/img/1/thumbnailImg.jpg",
        "option": [],
        "discountRate": 0,
        "shippingFee": 1500,
        "detailInfoImage": [
            "asset/products/detail/2/detail1.png",
            "asset/products/detail/2/detail2.png",
        ],
        "viewCount": 0,
        "pubDate": "2222-02-28",
        "modDate": "2222-02-28",
    }

fetch("https://eduapi.weniv.co.kr/753/product", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
    console.log("성공:", data);
})
.catch(error => {
    console.error("실패:", error);
});
```

실제 데이터가 생성이 되었는지 다시 GET 요청을 통해 확인해보세요.

```jsx
fetch('https://eduapi.weniv.co.kr/753/product', {
  method: 'GET'
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
```

**6.5 PUT: 서버야 유저 정보를 덮어씌워 줘!**

PUT 메서드는 서버에 이미 존재하는 리소스를 수정할 때 사용됩니다. 인증 값이 꼭 필요한 것은 아니지만 특히 POST, PUT, DELETE는 인증 정보를 요구하는 경우가 많습니다. 이 경우 아래와 같이 인증 값까지 함께 들어가 있게 됩니다. 여기서는 인증을 주석처리하고 갑니다.

```
PUT /753/product HTTP/1.1
Host: https://eduapi.weniv.co.kr/
Content-Type: application/json
Content-Length: 1560
Authorization: 토큰값
```

```jsx
const data =  {
        "id": 1,
        "productName": "test put data",
        "price": 999999,
        "stockCount": 100,
        "thumbnailImg": "asset/products/img/1/thumbnailImg.jpg",
        "option": [],
        "discountRate": 0,
        "shippingFee": 1500,
        "detailInfoImage": [
            "asset/products/detail/2/detail1.png",
            "asset/products/detail/2/detail2.png",
        ],
        "viewCount": 0,
        "pubDate": "2022-02-28",
        "modDate": "2022-02-28",
    }

// const token = "your_bearer_token_here";
    
fetch("https://eduapi.weniv.co.kr/753/product/1", {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
```

**6.6 DELETE: 서버야 있던 정보를 삭제해줘!**

```
DELETE /753/product/1 HTTP/1.1
Host: https://eduapi.weniv.co.kr/
Authorization: 토큰값
```

```jsx
const productId = 1;
// const token = "your_bearer_token_here";

fetch(`https://eduapi.weniv.co.kr/753/product/${productId}`, {
    method: "DELETE",
    // headers: {
    //     "Authorization": `Bearer ${token}`,
    // },
})
```

## 6.2 중간 과제 - Create 실습

다음 기본 코드를 활용하여 게시물을 생성하는 코드를 작성해보세요.

```jsx
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>제코베 스토어 관리자 페이지</title>
    </head>
    <body>
        <button id="btn-load">상품불러오기</button>

        <br /><br />
        <label for="inp-name">상품이름</label>
        <input id="inp-name" type="text" />

        <br /><br />
        <label for="inp-price">제품가격</label>
        <input id="inp-price" type="number" />

        <br /><br />
        <label for="inp-stock">재고</label>
        <input id="inp-stock" type="number" />

        <br /><br />
        <label for="inp-date">출시날짜</label>
        <input id="inp-date" type="date" />

        <button type="button" id="btn-register">상품등록하기</button>

        <script>
            // Read
            const btnLoad = document.querySelector("#btn-load");
            btnLoad.addEventListener("click", (event) => {
                // console.log("눌렀다.");
                fetch("https://eduapi.weniv.co.kr/753/product", {
                    method: "GET",
                })
                    .then((response) => response.json())
                    .then((data) => {
                        for (item of data) {
                            // console.log(i);
                            const $container =
                                document.createElement("section");
                            const $productName = document.createElement("h2");
                            const $price = document.createElement("p");

                            $productName.innerText = item.productName;
                            $price.innerText = item.price;

                            $container.appendChild($productName);
                            $container.appendChild($price);

                            document.body.appendChild($container);
                        }
                    });
            });

            // Create
            // Update

        </script>
    </body>
</html>
```

실습을 해보면서 어떻게 웹페이지가 보여지는지 먼저 확인해보도록 하겠습니다.

## 6.3 Response

```html
HTTP/1.1 200 OK
Server: Apache/2.4.41 (Ubuntu)
Content-Type: text/html; charset=UTF-8
Content-Length: 1024
Date: Mon, 01 Apr 2024 10:30:00 GMT

<!DOCTYPE html>
<html>
<head>
  <title>Example Page</title>
</head>
<body>
  <h1>Welcome to Example Page</h1>
  <p>This is an example HTTP response.</p>
</body>
</html>
```

HTTP 응답의 주요 구성 요소는 다음과 같습니다.

1. 상태 라인(Status Line)
    - HTTP 버전: 예시에서는 `HTTP/1.1`을 사용하고 있습니다.
    - 상태 코드(Status Code): 요청의 처리 결과를 나타내는 3자리 숫자입니다. 예시에서는 `200 OK`로, 요청이 성공적으로 처리되었음을 나타냅니다.
    - 상태 메시지(Status Message): 상태 코드에 대한 간략한 설명입니다.
2. 헤더(Headers)
    - Server: 웹 서버의 종류와 버전 정보를 포함합니다. 예시에서는 `Apache/2.4.41 (Ubuntu)`를 사용하고 있습니다.
    - Content-Type: 응답 바디의 MIME 타입을 나타냅니다. 예시에서는 `text/html; charset=UTF-8`로, HTML 문서이며 UTF-8 인코딩을 사용함을 나타냅니다.
    - Content-Length: 응답 바디의 크기를 바이트 단위로 나타냅니다. 예시에서는 `1024`로, 응답 바디의 크기가 1024바이트임을 나타냅니다.
    - Date: 응답이 생성된 날짜와 시간을 나타냅니다.
3. 빈 줄(Empty Line)
    - 헤더와 바디를 구분하는 빈 줄입니다.
4. 바디(Body)
    - 실제 응답 내용이 포함됩니다. 예시에서는 HTML 문서가 응답 바디에 포함되어 있습니다.

<aside>
💡 MIME(Multipurpose Internet Mail Extensions) 타입은 인터넷에서 전송되는 파일의 형식을 식별하는 데 사용되는 표준입니다. 웹 서버는 Content-Type 헤더를 통해 응답 바디의 MIME 타입을 클라이언트에게 알려줍니다. 클라이언트는 이 정보를 바탕으로 응답을 적절하게 처리하고 표시할 수 있습니다.

앞에서 우리는 이 Content-Type을 통해 HTML임에도 HTML로 로드가 되지 않고 text로 반영이 되는 것을 확인했습니다.

- 클라이언트에게 전송된 문서의 다양성을 알려주기 위한 메커니즘

[MIME 타입 - HTTP | MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

</aside>

### 6.3.1 응답의 결과를 알려주는 상태코드

- 서버에 요청을 보냈을 때, 서버가 요청이 어떻게 처리되었는지 알려주는 역할을 합니다.
- 프론트엔드 개발자는 이 상태코드를 확인하고 에러를 처리할 수 있습니다.
- 모든 상태코드를 외우거나 알 필요는 없습니다. 주요한 상태코드만 알아두시고, 필요에 따라 검색하시면 됩니다.
- **이 상태코드가 항상 올바르게 응답되진 않습니다. 스캐닝 공격을 방어하기 위해 회사 규정에 따라 404임에도 200을 주는 경우도 많습니다. 이 숫자는 서버에서 주는 숫자일 뿐입니다.** 회사 컨벤션에 따라 코딩을 하셔야 합니다.

**2xx**

| 200 | 서버가 요청을 제대로 처리. |
| --- | --- |
| 201 | 성공적으로 요청되었으며 서버가 새 리소스를 작성. |
| 202 | 서버가 요청을 접수했지만 아직 처리하지 않음. |

**3xx**

| 301 | 요청한 페이지를 새 위치로 영구적으로 이동. |
| --- | --- |

**4xx**

| 400 | Bad Request. 잘못된 요청 |
| --- | --- |
| 401 | Unauthorized. 권한 없이 요청. Authorization 헤더가 잘못된 경우. |
| 403 | Forbidden. 서버가 요청을 거부. |
| 404 | 서버가 요청한 페이지를 찾을 수 없음. |

**5xx**

- 서버 쪽에서 오류가 난 경우입니다. 이때는 백엔드 개발자에게 물어봐야겠죠.

| 500 | 서버에 오류가 발생하여 요청을 수행할 수 없음. |
| --- | --- |
| 503 | 서버가 오버로드되었거나 유지관리를 위해 다운되었기 때문에 현재서버 사용 불가. |

## 6.3.2 상태 코드 실습

```python
import socket
import json
from http.server import BaseHTTPRequestHandler, HTTPServer

class CustomHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(404)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(b"<h1>404입니다?</h1>")

def run_server(port=8000):
    server_address = ("", port)
    httpd = HTTPServer(server_address, CustomHTTPRequestHandler)
    print(f"Starting server on port {port}")
    httpd.serve_forever()

if __name__ == "__main__":
    run_server()

```

- 일반 URL 로 접속시(`127.0.0.1:8000`)
- JavaScript 코드
    
    ```jsx
    fetch('http://127.0.0.1:8000', {
      method: 'GET'
    })
    .then(response => response.text())
    .then(data => console.log(data))
    ```
    