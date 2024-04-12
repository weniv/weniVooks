# 10. HTTPS

wireshark를 통해 아래 홈페이지(**https**://paullab.co.kr/)와 통신하는 패킷을 잡아보도록 하겠습니다. 여려분이 실습을 하실 필요는 없습니다.

[바울랩, 위니브](https://paullab.co.kr/)

데이터는 Encrypted Application Data라는 곳에 담겨 확인할 수 없습니다. 도청(패킷 스니핑)을 하더라도 확인할 수가 없죠.

![](/images/basecamp-network/chapter10-1-1.png)

## 10.1 HTTP + 암호화 + 인증 + 무결성 = HTTPS

HTTP(Hypertext Transfer Protocol)는 인터넷에서 웹 브라우저와 웹 서버 간에 데이터를 주고받기 위한 프로토콜입니다. 그러나 HTTP는 암호화되지 않은 평문 통신이기 때문에 도청이나 변조, 중간자 공격에 취약합니다.

이러한 HTTP의 취약점을 보완하기 위해 HTTPS(HTTP Secure)가 등장했습니다. HTTPS는 HTTP에 SSL/TLS(SSL(Secure Socket Layer), TLS(Transport Layer Security)) 프로토콜을 결합한 것으로, 다음과 같은 특징이 있습니다.

1. 암호화: HTTPS는 SSL/TLS 프로토콜을 사용하여 **통신 내용을 암호화**합니다. 이를 통해 중간에서 데이터를 가로채더라도 내용을 확인할 수 없게 됩니다.
2. 인증: HTTPS는 SSL 인증서를 사용하여 통신 상대방의 신원을 확인합니다. 신뢰할 수 있는 인증 기관(CA)에서 발급받은 인증서를 사용하므로, 사용자는 자신이 의도한 웹 사이트와 통신하고 있음을 확신할 수 있습니다.
3. 무결성: HTTPS는 메시지 무결성 검사를 통해 데이터가 변조되지 않았음을 보장합니다. SSL/TLS는 해시 함수와 디지털 서명을 사용하여 데이터의 무결성을 검증합니다.

<aside>
💡 HTTP : HTTP → TCP → IP
HTTPS: HTTP → SSL/TLS → TCP → IP

</aside>

<aside>
💡 SSL은 보안 취약점이 발견되어 업데이트된 버전이 TLS입니다. 그런데 대다수의 사람이 SSL 이름이 익숙하다보니 이 이름이 아직도 함께 따라다니고 있는 것입니다. SSL은 key를 통해 암호화와 복호화를 진행합니다.

</aside>

## 10.2 HTTPS 적용

HTTPS를 사용하면 개인정보 보호와 보안이 강화되지만, **암호화와 복호화 과정에서 추가적인 CPU와 메모리 자원이 소모**됩니다. 따라서 모든 웹 사이트에서 HTTPS를 사용하는 것은 아닙니다. 민감한 정보를 다루는 페이지에서만 선택적으로 HTTPS를 적용하는 경우도 있습니다. 그러나 최근에는 **개인정보 보호와 보안에 대한 인식이 높아지면서 HTTPS 사용이 점차 확대되는 추세**입니다.

- HTTPS를 적용하기 위해서는 인증서가 있어야 합니다. 대부분 유료입니다. 무료 인증서는 권하는 편은 아닙니다.
- CA(Certificate Authority, 인증기관) 인증을 받은 곳에서 발급 가능합니다. (AWS는 URL구매 후 인증서 구매해서 바로 연결 가능합니다.)