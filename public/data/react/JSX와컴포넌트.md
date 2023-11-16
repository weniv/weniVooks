# JSX

## 1. JSX란?

src에 있는 App.js를 수정하며 살펴보겠습니다.

```jsx
function App() {
  return (
    <div className="App">
      <h2>hello world</h2>
    </div>
  );
}

export default App;
```

챕터 1-2 ‘리액트 설치하기’에서 이미 파일과 폴더 구조를 정리해 놓은 상태라면 App 함수 내부의 div 가 텅 비어있을 거예요. 이 부분은 JSX 설명을 위한 예제 코드이며 바로 뒤에서 직접 수정할 예정이니 그냥 읽고 넘어가도 좋습니다.

다시 App.js를 살펴봅시다. HTML과 JavaScript를 사용해봤다면 return 문 안에 있는 내용들이 익숙할 거예요. 일반적인 JavaScript에서 위와 같은 방식으로 사용한다면 에러가 발생합니다.

하지만 위와 같은 방법을 사용하면 더 편하게 컴포넌트로 분리하여 코드를 작성할 수 있습니다. 이 문법을 **JSX(JavaScript + XML)**라고 합니다. JSX는 위처럼 자바스크립트 코드 안에서 HTML과 유사한 형태의 마크업을 작성할 수 있게 해주어, React 컴포넌트의 구조와 모양을 더 직관적으로 정의할 수 있도록 도와줍니다. 컴포넌트는 다음 챕터에서 더욱 구체적으로 배울 예정이지만 일단은 재사용 가능한 UI 조각이라는 개념으로 이해해주시면 됩니다.

[유용한 Tip] `.js` 파일을 `.jsx` 파일로 변경하면 태그 자동 완성이 활성화 됩니다.

이번에는 직접 App 함수를 아래와 같이 수정해 봅시다.

```jsx
function App() {
  return <h1>안녕, 라이캣!</h1>;
}
```

코드를 수정한 후 터미널에서 “npm start” 명령어를 입력하여 실행해 보면, 화면에 우리가 입력한 문구가 출력된 걸 볼 수 있습니다.

```bash
npm start
```

![Untitled](<JSX%20(%E1%84%82%E1%85%A1%E1%84%8B%E1%85%A7%E1%86%BC,%20%E1%84%8B%E1%85%AA%E1%86%AB%E1%84%85%E1%85%AD)%2099647c574c744f5fa3e3a97185777d51/Untitled.png>)

[더 나아가기] **JSX는 React에서만 사용되나요?**

아닙니다! JSX는 React 뿐만 아니라 다른 JavaScript 라이브러리나 프레임워크에서도 사용될 수 있습니다. JSX가 React에서 처음 소개되었고, React의 컴포넌트 UI를 선언할 때 주로 사용되기 때문에 그렇게 생각하실 수 있지만 JSX 그 자체로는 특정 라이브러리나 프레임워크에 종속적이지 않습니다.

하지만 브라우저는 JSX 코드를 이해할 수 없습니다. 따라서 Babel과 같은 도구를 사용해 브라우저에서 실행 가능한 순수 JavaScript 코드로 변환해야 합니다. 이 과정에서 JSX 요소는 React.createElement 함수 호출로 변환됩니다.

[더 나아가기] **Babel 이란?**

Babel은 최신 Javascript 문법이나 JSX와 같은 확장 문법을 브라우저에서 이해할 수 있는 일반적인 JavaScript로 변환해주는 도구입니다.

```jsx
// 변환 전
function MyComponent() {
  return <div>안녕, 라이캣!</div>;
}
```

```jsx
// 변환 후
function MyComponent() {
  return React.createElement('div', null, '안녕, 라이캣!');
}
```

여기서 첫 번째 파라미터 "div"는 생성할 요소의 타입을 나타내며, 두 번째 파라미터 null은 클래스명과 같은 요소의 속성을 나타냅니다. 세 번째 파라미터 "안녕, 라이캣!"은 요소의 자식을 의미합니다.

위처럼 변환이 이루어진 뒤에야 브라우저는 코드를 이해하고 React 애플리케이션을 동작시킬 수 있습니다.

[더 나아가기] **그럼 Babel을 따로 설치해야 하나요?**

create-react-app을 사용하면 Babel과 같은 도구가 내장되어 있기 때문에 따로 Babel을 설치할 필요가 없습니다. create-react-app은 프로젝트를 시작할 때 JSX 문법을 일반적인 JavaScript로 변환해주는 Babel 등 필요한 도구와 설정들을 포함하여 자동적으로 프로젝트 구조를 생성합니다. 따라서 개발자는 JSX 문법을 그냥 사용하면 되고 create-react-app이 내부적으로 이를 JavaScript로 변환해줍니다.

## 2. JSX문법

### 2.1 최상위 부모 요소는 1개

이번에는 <h1> 태그를 이용해 2개의 태그를 작성하고 저장해보겠습니다.

```jsx
function App() {
  return (
			<h1>안녕, 라이캣 1호!</h1>
			<h1>안녕, 라이캣 2호!</h1>
  );
}
```

![Untitled](<JSX%20(%E1%84%82%E1%85%A1%E1%84%8B%E1%85%A7%E1%86%BC,%20%E1%84%8B%E1%85%AA%E1%86%AB%E1%84%85%E1%85%AD)%2099647c574c744f5fa3e3a97185777d51/Untitled%201.png>)

컴파일에 실패한 것을 볼 수 있습니다. 문제가 있는 부분은 이렇게 알림을 주는데요. JSX로 표현할 때에는 하나의 부모만 가질 수 있습니다. 즉, **최상위에는 한 개의 태그**만 있어야 한다는 것입니다. 다음과 같이 코드를 수정하면 잘 실행되는 것을 확인할 수 있습니다.

```jsx
function App() {
  return (
    <div>
      <h1>안녕, 라이캣 1호!</h1>
      <h1>안녕, 라이캣 2호!</h1>
    </div>
  );
}
```

![잘 동작합니다!](<JSX%20(%E1%84%82%E1%85%A1%E1%84%8B%E1%85%A7%E1%86%BC,%20%E1%84%8B%E1%85%AA%E1%86%AB%E1%84%85%E1%85%AD)%2099647c574c744f5fa3e3a97185777d51/Untitled%202.png>)

잘 동작합니다!

이번에는 HTML의 기존 태그가 아닌 React에서 제공하는 Fragment를 사용해 봅시다. Fragment는 일종의 래퍼(Wrapper) 역할을 하며 다음 세 가지 방법으로 사용할 수 있습니다. 이 부분은 직접 쳐보며 JSX 문법에 익숙해져도 좋고, 그냥 이해하며 읽고 넘어가셔도 좋습니다.

**방법 1**

```jsx
import React from 'react';

function MyComponent() {
  return (
    <React.Fragment>
      <h1>안녕, 라이캣 1호!</h1>
      <h1>안녕, 라이캣 2호!</h1>
    </React.Fragment>
  );
}
```

**방법 2**

React 16.2 버전 이상에서는 Fragment를 사용할 때 더 간결한 문법을 제공합니다.

```jsx
import React, { Fragment } from 'react';

function MyComponent() {
  return (
    <Fragment>
      <h1>안녕, 라이캣 1호!</h1>
      <h1>안녕, 라이캣 2호!</h1>
    </Fragment>
  );
}
```

**방법 3**

마지막으로 다음과 같이 Fragment를 import 없이 간결하게 사용할 수도 있습니다.

```jsx
function MyComponent() {
  return (
    <>
      <h1>안녕, 라이캣 1호!</h1>
      <h1>안녕, 라이캣 2호!</h1>
    </>
  );
}
```

이렇게 Fragment를 이용하면 여러 요소를 그룹화할 수 있으면서 추가적인 DOM 요소가 생성되지 않아 렌더링 성능에도 도움이 됩니다.

### 2.2 주석

React에서 주석은 JSX 사용 여부에 따라 주석 작성 방법이 달라집니다. ➊ 은 return 문 이전이기 때문에 JavaScript 와 똑같이 // 우측에 주석을 입력할 수 있습니다. 그리고 JSX에서는 ➋ 처럼 {/\* \*/} 내부에 주석을 작성합니다.

```jsx
function App() {
  // ➊ JavaScript와 똑같이!
  return (
    <div>
      {' '}
      {/* ➋ 최상위태그는 하나만! */}
      <h1>안녕, 라이캣 1호</h1>
      <h1>안녕, 라이캣 2호!</h1>
    </div>
  );
}
```

### 2.3 태그에 클래스 넣기 + 스타일 적용하기

```jsx
import './app.css';

function App() {
  return (
    <div>
      <h1>안녕, 라이캣 1호</h1>
      <h1>안녕, 라이캣 2호!</h1>
      <div className="newClass"></div> {/* class대신 className=""로 진행! */}
    </div>
  );
}

export default App;
```

이번에는 위에서 작성한 <div> 태그에 스타일을 적용해 봅시다. HTML에서와 달리 클래스를 추가할 때 class라고 기재하지 않고 className이라고 표기하여 클래스를 정의합니다.

만약 JSX에서 제공하는 className을 사용하지 않고 우리가 사용했던 class를 그대로 사용하면 어떻게 될까요? 아래와 같이 실행은 되지만 콘솔창에 경고가 뜨는 것을 볼 수 있습니다. JSX를 사용하는 만큼 권고 사항에 따라주세요.

![Untitled](<JSX%20(%E1%84%82%E1%85%A1%E1%84%8B%E1%85%A7%E1%86%BC,%20%E1%84%8B%E1%85%AA%E1%86%AB%E1%84%85%E1%85%AD)%2099647c574c744f5fa3e3a97185777d51/Untitled%203.png>)

클래스를 추가해 주었다면 이제는 css 파일을 수정해 봅시다. 우선 App.css 파일을 열어봅시다. 파일을 살펴보면 App.css도 기본으로 작성되어 있는 코드가 있습니다. 안에 있는 내용을 모두 지워준 후 아래 코드를 작성하면 됩니다. css는 기존에 우리가 작성했던 방식 그대로 사용하면 됩니다.

```css
.newClass {
  width: 100%;
  height: 20px;
  background-color: black;
}
```

![Untitled](<JSX%20(%E1%84%82%E1%85%A1%E1%84%8B%E1%85%A7%E1%86%BC,%20%E1%84%8B%E1%85%AA%E1%86%AB%E1%84%85%E1%85%AD)%2099647c574c744f5fa3e3a97185777d51/Untitled%204.png>)

저장 후 실행하면 위의 사진과 같이 '안녕, 라이캣 2호!' 하단에 검은색 줄이 생긴 모습을 보실 수 있습니다. 이번에는 인라인 스타일로 적용하는 법도 살펴보겠습니다.

인라인 스타일로 적용할 때는 주의할 점이 있습니다. style을 정의할 때는 객체 형태로 작성해야 하는데요, 객체 형태는 아래와 같이 키와 값을 짝 지어 작성합니다.

```jsx
{
	"key":value,
}
```

또한 앞서 클래스 이름을 태그에 추가할 때 `class="클래스이름"` 형태가 아닌 `className="클래스이름"`으로 적었었죠?

이처럼 HTML과 또 다른 차이점이 존재합니다. **스타일을 정의할 때는 '-'를 사용할 수 없습니다. 그렇기 때문에 카멜 표기법을 사용하여 작성**합니다. `.css` 파일을 만들어 사용할 때에는 그대로 사용할 수 있습니다.

다음 두 가지 인라인 스타일을 비교해 보세요.

```jsx
// ➊ JSX 인라인 CSS
<h1 style={{backgroundColor:"black", color:"white"}}>안녕, 라이캣 1호</h1>

// ➋ 일반 인라인 CSS
<h1 style='background-color:black; color:white'>안녕, 라이캣 2호!</h1>
```

**[여기서 잠깐!] 카멜 케이스가 무엇인가요?**

카멜 표기법(Camel Case)은 변수, 함수, 메서드 등의 이름을 작성할 때 공백 없이 연결된 단어들을 사용하는 네이밍 규칙 중 하나입니다. myVariableName, getUserInfo 처럼 각 단어의 첫 글자는 소문자로 시작하며, 그 다음 단어부터는 첫 글자를 대문자로 씁니다. 가독성이 좋아서 많은 프로그래밍 언어에서 권장되는 네이밍 규칙 중 하나입니다.

다음과 같이 첫 번째 h1 의 인라인 스타일을 지정해 봅시다.

```jsx
import './app.css';

function App() {
  return (
    <div>
      <h1 style={{ backgroundColor: 'black', color: 'white' }}>
        안녕, 라이캣 1호
      </h1>
      <h1>안녕, 라이캣 2호!</h1>
      <div className="newClass"></div>
    </div>
  );
}

export default App;
```

![Untitled](<JSX%20(%E1%84%82%E1%85%A1%E1%84%8B%E1%85%A7%E1%86%BC,%20%E1%84%8B%E1%85%AA%E1%86%AB%E1%84%85%E1%85%AD)%2099647c574c744f5fa3e3a97185777d51/Untitled%205.png>)

### 2.4 JavaScript 사용하기

이번에는 JavaScript에서 변수를 만들고 이 변수를 활용해 보도록 하겠습니다.

다음 코드를 작성해 주세요. 기존 return 문 위인 ➊ 에서 `const name = '라이캣!'` 으로 변수 하나를 생성하고, ➋ return문 안 jsx 태그 안에 ‘라이캣’ 대신 중괄호를 사용하여 name으로 변경합니다.

```jsx
import './App.css';

function App() {
	const name = '라이캣!'; ➊
  return (
		<div>
			<h1 style={{backgroundColor:"black", color:"white"}}>
				안녕, **{name}** 1호 ➋
			</h1>
			<h1>안녕, 라이캣 2호!</h1>
			<div className="newClass"></div>
		</div>
  );
}

export default App;
```

![Untitled](<JSX%20(%E1%84%82%E1%85%A1%E1%84%8B%E1%85%A7%E1%86%BC,%20%E1%84%8B%E1%85%AA%E1%86%AB%E1%84%85%E1%85%AD)%2099647c574c744f5fa3e3a97185777d51/Untitled%206.png>)

다음 예시처럼 중괄호 하나는 JavaScript의 다양한 문법을 사용할 수 있게 해줍니다. 한번 테스트해보는 것을 권해드려요!

```jsx
{
  100 + 1;
}
{
  'hello' + 'world';
}
{
  [1, 2, 3].map((x) => x ** 2);
}
{
  함수();
}
{
  변수;
}
{
  값 ? 'one' : 'two';
}
```

스타일도 변수에 넣어 사용할 수 있습니다. 첫 번째 <h1>에 적용한 스타일을 someStyle 변수에 할당해 봅시다.

```jsx
const someStyle = { backgroundColor: 'black', color: 'white' };
```

변수를 선언해 준 후 아래와 같이 style={somStyle}을 추가하여 스타일을 적용합니다.

```jsx
import './App.css';

function App() {
  const name = '라이캣!';
  const someStyle = { backgroundColor: 'black', color: 'white' };
  return (
    <div>
      <h1 style={someStyle}>안녕, {name} 1호</h1>
      <h1>안녕, 라이캣 2호!</h1>
      <div className="newClass"></div>
    </div>
  );
}

export default App;
```

이 외에도 JavaScript에서 동작하는 기본적인 기능들을 활용하여 많은 것들을 할 수 있습니다. 이 부분은 뒤에서 더 살펴보도록 하겠습니다.

## 3. 실습 과제

앞에서 배운 내용을 바탕으로 아래와 같은 UI를 추가해 보세요.

![Untitled](<JSX%20(%E1%84%82%E1%85%A1%E1%84%8B%E1%85%A7%E1%86%BC,%20%E1%84%8B%E1%85%AA%E1%86%AB%E1%84%85%E1%85%AD)%2099647c574c744f5fa3e3a97185777d51/Untitled%207.png>)

1. 각 시간과 날짜는 직접 입력(하드코딩)하지 않고 출력하게 만들어 주세요.
2. 새로고침할 때마다 **현재 시간**을 표시합니다. Tip) JavaScript에서 제공하는 Date 활용
3. 스타일도 적용해 보세요.

- 정답 코드

  ```jsx
  import './app.css';

  function App() {
    const name = '라이캣!';
    const someStyle = { backgroundColor: 'black', color: 'white' };
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const hour = today.getHours();
    const min = today.getMinutes();
    const sec = today.getSeconds();

    return (
      <div>
        <div>
          <h1 style={someStyle}>안녕, {name} 1호</h1>
          <h1>안녕, 라이캣 2호!</h1>
          <div className="newClass"></div>
        </div>
        <div style={{ backgroundColor: 'black', color: 'white' }}>
          <h1 style={{ color: 'red' }}>년 : {year}</h1>
          <h1>
            월/일 : {month}/{date}
          </h1>
          <h1>
            시간 : {hour}시 {min}분 {sec}초
          </h1>
        </div>
      </div>
    );
  }

  export default App;
  ```

# 컴포넌트

## 1. 컴포넌트란?

앞서 살펴보았듯이 리액트는 모든 웹 애플리케이션을 작은 조각으로 나눠서 구성하는 컴포넌트(Component) 기반 라이브러리입니다. 컴포넌트는 화면의 UI(User Interface)를 구성하는 블록 또는 모듈의 개념을 나타냅니다. 이러한 컴포넌트들을 조합하여 웹 애플리케이션을 구축하고 관리하는 것이 리액트의 주요 개념 중 하나입니다.

![에어비앤비 예시 ](<%E1%84%8F%E1%85%A5%E1%86%B7%E1%84%91%E1%85%A9%E1%84%82%E1%85%A5%E1%86%AB%E1%84%90%E1%85%B3%20(%E1%84%82%E1%85%A1%E1%84%8B%E1%85%A7%E1%86%BC,%20%E1%84%8B%E1%85%AA%E1%86%AB%E1%84%85%E1%85%AD)%201171f1a097e840549bc378db27cc30c0/Untitled.png>)

에어비앤비 예시

리액트를 사용하고 있는 대표 기업 중 하나인 에어비앤비의 사이트를 같이 살펴봅시다. 이미지에서 파란 테두리가 쳐져 있는 숙소 아이템 하나하나가 바로 컴포넌트입니다. 숙소를 등록할 때마다 매번 새로 작업하는 것보다 미리 만들어진 틀을 사용하는 것이 효율적이겠죠? 미리 만들어진 컴포넌트를 사용하고 각 숙소의 이미지, 위치, 가격 등과 같은 정보를 다른 컴포넌트로부터 받아와 이미지처럼 동적으로 구성할 수 있습니다.

만약 숙소 가격의 글자 색을 검정색에서 파란색으로 변경해야 한다고 가정해봅시다. 아이템마다 스타일을 수정할 필요 없이 컴포넌트의 해당 부분만 수정하면 되니 훨씬 편리할 것입니다. 이렇게 컴포넌트를 활용하면 코드의 재사용성과 유지 보수성이 향상됩니다. 물론 컴포넌트를 구성하는 단위는 개발자의 재량이기 때문에 숙소명, 가격 하나하나를 각각의 컴포넌트로 구성할 수도 있습니다.

## 2. 클래스형 컴포넌트와 함수형 컴포넌트

React에서 컴포넌트를 만들 수 있는 방법에는 클래스형과 함수형, 총 두 가지가 있습니다. **컴포넌트의 이름을 지을 때는 첫 글자를 대문자**로 작성해야 컴포넌트로 해석된다는 점을 염두에 두고 각각의 방법과 특징을 알아본 뒤, 직접 컴포넌트를 만들어보겠습니다.

### 2-1. 클래스형 컴포넌트

먼저 클래스형 컴포넌트는 React의 초기 버전부터 사용된 전통적인 방식의 컴포넌트입니다. 이 컴포넌트는 ES6 클래스로 정의되며, **`React.Component`** 클래스를 상속받아 구현합니다. 다음은 기본적인 클래스 컴포넌트의 구조입니다.

```jsx
import React, { Component } from 'react';

// ➊ Component 클래스 상속
class MyComponent extends Component {
  // ➋ 렌더링 메서드: 컴포넌트의 UI를 반환
  render() {
    return <div>Hello, World!</div>;
  }
}

export default MyComponent;
```

➊ 이 코드에서 MyComponent 클래스는 React.Component 클래스를 상속받아 만들어졌습니다. ➋ 클래스 컴포넌트는 render() 메서드를 반드시 포함해야 하며, 이 메서드에서 컴포넌트가 렌더링할 JSX를 반환합니다.

다음 예제는 버튼을 누를 때마다 카운트가 하나씩 증가하는 클래스형 컴포넌트입니다.

```jsx
import React, { Component } from 'react';

class MyClassComponent extends Component {
  // 클래스 컴포넌트의 생성자 메서드
  constructor(props) {
    super(props);
    // ➊ 상태(state) 초기화
    this.state = {
      count: 0,
    };
  }

  // ➋ 이벤트 핸들러 메서드
  handleIncrement = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  // 렌더링 메서드: 컴포넌트의 UI를 반환
  render() {
    return (
      <div>
        <h1>클래스형 컴포넌트 예제</h1>
        <p>카운트: {this.state.count}</p>
        <button onClick={this.handleIncrement}>증가</button>
      </div>
    );
  }
}

export default MyClassComponent;
```

위 예제에서 MyClassComponent는 Component 클래스를 확장하여 만들어진 클래스형 컴포넌트입니다. ➊의 constructor() 메서드에서 this.state 객체를 초기화하고 ➋ handleIncrement 라는 이벤트 핸들러 메서드를 통해 setState() 메서드를 호출하여 count 상태를 업데이트합니다.

클래스형 컴포넌트는 여전히 지원되고 있지만, React 16.8 버전 이후부터 등장한 함수형 컴포넌트와 훅을 사용하는 것이 보다 간결하고 성능적으로 효율적이기에 함수형 컴포넌트의 사용이 권장되고 있습니다.

### 2-2. 함수형 컴포넌트

함수형 컴포넌트는 React에서 컴포넌트를 만드는 데 사용되는 주요한 방법 중 하나입니다. 이 컴포넌트는 문자 그대로 JavaScript 함수로 정의됩니다. 다음은 기본적인 함수형 컴포넌트의 구조입니다.

```jsx
import React from 'react';

const MyComponent = () => {
  return <div>Hello, World!</div>;
};

export default MyComponent;
```

위의 코드에서 MyComponent는 함수로 정의되어 있습니다. 이 함수는 JSX를 반환하고, 이를 통해 해당 컴포넌트가 렌더링됩니다.

이전 클래스형 컴포넌트의 카운트 예제를 함수형으로 변경해봅시다.

```jsx
import React, { useState } from 'react';

const MyFunctionalComponent() {
  // ➊ useState 훅을 사용하여 상태(state) 초기화
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>함수형 컴포넌트 예제</h1>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        증가
      </button>
    </div>
  );
};

export default Counter;
```

위 예제는 클래스형 컴포넌트의 예제와 동일한 기능을 하고 있습니다. 아직 훅에 대해 배우진 않았지만 지금은 count라는 상태를 관리하기 위한 일종의 함수라고 이해해주세요. ➊의 useState 훅을 통해 count의 값을 0으로 초기화하고 있으며 클래스 컴포넌트 예제에서의 ➊과 동일한 기능을 하고 있습니다.

함수형 컴포넌트는 클래스형 컴포넌트에 비해 간결하고 가독성이 좋으며, 현재 React 생태계에서 주로 사용되는 방식입니다.

### 2-3. 무엇을 사용해야 할까?

함수형 컴포넌트와 클래스형 컴포넌트는 프로젝트의 요구사항 등 상황에 맞춰 선택해야 합니다. 현대적인 React 프로젝트에서는 함수형 컴포넌트와 훅을 사용하는 추세가 높아지고 있지만, 기존의 클래스형 컴포넌트로 작성된 코드를 유지보수해야 할 경우에도 여전히 중요한 역할을 할 수 있기 때문에 클래스형 컴포넌트에 대해서도 이해하고 넘어가시는 것을 권해드립니다. 하지만 우리는 최신 React 프로젝트에서 더욱 자주 사용되는 함수형 컴포넌트로 실습을 진행해보겠습니다.

## 3. 컴포넌트 실습

이전 `JSX` 챕터의 ‘실습 과제’에서 진행했던 코드를 한 번 살펴보겠습니다.

```jsx
import './App.css';

function App() {
  const name = '라이캣!';
  const someStyle = { backgroundColor: 'black', color: 'white' };
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const hour = today.getHours();
  const min = today.getMinutes();
  const sec = today.getSeconds();

  return (
    <div>
      <div>
        <h1 style={someStyle}>안녕, {name} 1호</h1>
        <h1>안녕, 라이캣 2호!</h1>
        <div className="newClass"></div>
      </div>
      <div style={{ backgroundColor: 'black', color: 'white' }}>
        <h1 style={{ color: 'red' }}>년 : {year}</h1>
        <h1>
          월/일 : {month}/{date}
        </h1>
        <h1>
          시간 : {hour}시 {min}분 {sec}초
        </h1>
      </div>
    </div>
  );
}

export default App;
```

처음에 작성했던 코드와 비교하면 태그들이 많이 늘어났네요! 하지만 우리가 실제로 페이지를 만들게 된다면 return문 안에 있는 코드가 정말 많이 길어질 것입니다. 코드가 길어질수록 가독성도 떨어지겠죠? 지금부터 가독성을 높이고 쉬운 유지보수를 위해서 컴포넌트를 분리해보겠습니다.

[여기서 잠깐!] h1이 한 문서에 5개입니다. h1은 문서 내 1개만 작성해야 하기 때문에 컴포넌트를 나눌 때에도 이러한 시맨틱 구조에 신경을 써야 합니다.

### 3-1. 컴포넌트 만들기

```jsx
return (
  <div>
    <Licat /> {/* 라이캣 모음 */}
    <Time /> {/* 시간 보여주기 */}
  </div>
);
```

예제의 Licat, Time과 같이 기능 또는 목적에 따라 묶은 것을 컴포넌트라고 합니다. 컴포넌트를 분리함으로써 이름만 보고도 어떤 역할을 하는지 예측할 수도 있겠죠?

다시 실습 코드 예제로 돌아와 먼저 어떻게 분리할지 살펴본 후 컴포넌트를 분리해 보도록 하겠습니다. 분리할 부분의 시작점과 끝점을 주석으로 나타내보겠습니다.

```jsx
import './App.css';

function App() {
  const name = '라이캣!';
  const someStyle = { backgroundColor: 'black', color: 'white' };
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const hour = today.getHours();
  const min = today.getMinutes();
  const sec = today.getSeconds();

  return (
    <div>
      {/* ➊ Licat 컴포넌트 시작 부분 */}
      <div>
        <h1 style={someStyle}>안녕, {name} 1호</h1>
        <h1>안녕, 라이캣 2호!</h1>
        <div className="newClass"></div>
      </div>
      {/* ➋ Licat 컴포넌트 끝 부분 */}

      {/* ➌ Time 컴포넌트 시작 부분 */}
      <div style={{ backgroundColor: 'black', color: 'white' }}>
        <h1 style={{ color: 'red' }}>년 : {year}</h1>
        <h1>
          월/일 : {month}/{date}
        </h1>
        <h1>
          시간 : {hour}시 {min}분 {sec}초
        </h1>
      </div>
      {/* ➍ Time 컴포넌트 끝 부분 */}
    </div>
  );
}

export default App;
```

App 컴포넌트에서 Licat, Time 컴포넌트를 분리한 뒤 코드를 수정하였습니다. 실행시켜보면 이전과 동일한 화면이 표시됩니다.

```jsx
function Licat(props) {
  const name = '라이캣!';
  const someStyle = { backgroundColor: 'black', color: 'white' };
  return (
    <div>
      <h1 style={someStyle}>안녕, {name} 1호</h1>
      {/* 이렇게하면 나옵니다. */}
      <h1>안녕, 라이캣 2호!</h1>
      <div className="newClass" /> {/* class대신 className=""로 진행! */}
    </div>
  );
}

function Time(props) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const hour = today.getHours();
  const min = today.getMinutes();
  const sec = today.getSeconds();
  return (
    <div style={{ backgroundColor: 'black', color: 'white' }}>
      <h1 style={{ color: 'red' }}>년 : {year}</h1>
      <h1>
        월/일 : {month}/{date}
      </h1>
      <h1>
        시간 : {hour}시 {min}분 {sec}초
      </h1>
    </div>
  );
}

function App() {
  return (
    <div>
      <Licat />
      <Time />
    </div>
  );
}
```

완성된 코드는 오히려 컴포넌트 분리 이전보다 길어진 것을 볼 수 있습니다. 하지만 최상위 `App()`에서 바라보면 소스코드가 보다 가독성 있게 정리되었습니다. 이렇게 만든 `<Licat/>`과 `<Time/>` 을 **컴포넌트**라고 부릅니다. 그리고 `App()` 도 하나의 컴포넌트임을 알게 되었습니다.

```jsx
function App() {
  return (
    <div>
      <Licat />
      <Time />
    </div>
  );
}
```
