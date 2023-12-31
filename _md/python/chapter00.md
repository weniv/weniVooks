---
title: 들어가기 전
date: 2023-10-31
---

# 1. 제목

## 1.1. 제목

### 1.1.1. 제목

![이미지 캡션!](/images/banner/main-banner-img1.png)

### 링크

[**출처**](<[https://www.naver.com/](https://www.naver.com/)>)
[링크](<[https://www.naver.com/](https://www.naver.com/)>)
[codepen에서 실행하기](#)

::a[codepen에서 실행하기]{class='btn-solid' href="#"}

### 기본 텍스트

이 아이에게 한글과 영어 단어를 가르치고 싶어 문에는 문, door라고 포스트잇을 붙여 놓았어요. 변수는 이 포스트잇과 비슷합니다. 담겨져 있는 실체는 변하지 않아요. 다만 화장실에 화장실이라는 포스트잇을 붙여넣거나 토일렛이라는 포스트잇을 붙여놓으면, 그 화장실은 화장실이나 토일렛으로 불릴 수 있는 것이죠. 무엇이라 불리던 그 실체가 화장실인 것은 변하지 않습니다.
자, 이번에는 양말을 보겠습니다. 저렇게 양말이라 적혀져 있다면 안에 양말이 있겠죠? 만약 여기다가 화장실이라는 이름을 붙여봅시다. 그러면 안에 들어가는 양말이 화장실이 되나요? 그렇지 않습니다. **굵은 글씨: 그 안에 들어있는 실체는 변하지 않아요.**

### callout

:::div{.callout}
특히 C와 같은 다른 언어에서 배우는 변수 개념으로 python을 이해하시면 혼란이 올 수 있습니다. C는 변수가 값을 ‘가리키는 것’이 아니라 값이 ‘담겨’있습니다. 이 수업에서 필요 이상의 개념, 예를 들어 C언어나 JAVA언어를 함께 설명하진 않습니다. 여기서 가져가야할 포인트는 ‘변수의 개념이 언어마다 다르다’입니다.
:::

### 인용문

> **인용문**
> 특히 C와 같은 다른 언어에서 배우는 변수 개념으로 python을 이해하시면 혼란이 올 수 있습니다. C는 변수가 값을 ‘가리키는 것’이 아니라 값이 ‘담겨’있습니다. 이 수업에서 필요 이상의 개념, 예를 들어 C언어나 JAVA언어를 함께 설명하진 않습니다. 여기서 가져가야할 포인트는 ‘변수의 개념이 언어마다 다르다’입니다.

### 리스트

- ul
  1. ol
  2. ol
- ul
  - ul
  - ul
- ul

1. ol
   1. ol
   2. ol
2. ol

   - ul
   - ul

3. ol

### 테이블

| 제목 | 제목       | 제목       |
| ---- | ---------- | ---------- |
| 제목 | 내용입니다 | 내용입니다 |
| 제목 | 내용입니다 | 내용입니다 |
| 제목 | 내용입니다 | 내용입니다 |

| 제목                | 제목                                            | 제목                                                                                                 |
| ------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 제목 제목 제목 제목 | 내용입 니다                                     | 내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다 |
| 제목                | djdka\,jiqeflkjaldjkladjfklajdklfjakldfjkladjfl | 내용입니다                                                                                           |
| 제목                | 내용입니다                                      | 내용입니다                                                                                           |

### 코드

`code`, **`code`**

```jsx
export default function Home() {
  return <div>Hello World!</div>;
}
```

```python
x = 10
y = x
z = y
x = 20
print(y, z) #결과 값은 10입니다.
```

```javascript
function findSequence(goal) {
  function find(start, history) {
    if (start == goal) {
      return history;
    };
    else if (start > goal){
      return null;
    }
    else
      return (
        find(start + 5, '(' + history + ' + 5)') ||
        find(start * 3, '(' + history + ' * 3)')
      );
  }
  return find(1, '1');
}
```

```python
import re
dkdkdfdsf
def solution(data):
```

```html
<!DOCTYPE html>
<html lang="ko-KR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
  </head>
  <body></body>
</html>
```

```css
h1 {
  color: royalblue;
}
.class {
  background: none;
}
#id {
  font-weight: bold;
}
```
