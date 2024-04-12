# 1. 강의 소개

**개발자가 웹/네트워크/HTTP를 얼마나 알아야 할까요? 🤔**

이 강의에서는 개발자라면 **누구나 알아야 할 웹, 네트워크, 그리고 HTTP의 기초**에 대해 다룰 예정입니다. 지금 당장 아래의 대화를 완벽히 이해하지 못하더라도 걱정하지 마세요. 우리는 실제 코드를 통해 이러한 개념들을 하나씩 살펴볼 것입니다.

원활한 커뮤니케이션을 위해, API를 제작하거나 다루기 위해, 성능 최적화나 디버깅을 위해 기초적인 HTTP를 필수적으로 습득할 필요가 있습니다. 이 강의를 통해 막연한 두려움을 가지고 있었던 웹/네트워크/HTTP를 **‘실체(코드와 패킷)’**를  통해 기초를 탄탄히 다지는 시간이 되셨으면 좋겠습니다.

함께 알아가 보겠습니다!

- 개발자 대화 살펴보기
    
    ![](/images/basecamp-network/chapter01-1-1.png)
    
- 개발자 대화 살펴보기
    
    ![](/images/basecamp-network/chapter01-1-2.png)
    

## 1.1 강의 대상

- 아래 3개의 강의를 모두 수강했거나, 이에 준하는 지식을 가진 사람에게 적합합니다.
- 아래 3개의 과목을 간단한 문법을 해봤을 정도면 족합니다.

![](/images/basecamp-network/chapter01-1-3.png)

![](/images/basecamp-network/chapter01-1-4.png)

![](/images/basecamp-network/chapter01-1-5.png)

## 1.2 강의 특징

- 이론만 설명하는 것이 아니라 실습을 통해 **실무에서 어떤 지식이 필요한지 함께 설명**합니다.
- Python, HTML, CSS, JS 코드를 통해 실제 어떠한 값이 넘어가는지 **출력해보며 살펴**봅니다.
    - 다만 이 수업이 Python, HTML, CSS, JS 수업이 아니므로 코드를 라인별로 해석하기 보다는 출력 결과를 주로 살펴보며 얘기 나눕니다.
    - 따라서 실습하는 언어를 몰라도 크게 문제가 되지 않습니다.
- 프레임웤이나 외부 라이브러리 의존도를 최소화하고 가능하면 내장 모듈을 사용하여 살펴봅니다.

## 1.3 수업 실습 환경

<aside>
💡 사용하고 있으신 브라우저와 IDE를 사용하셔도 좋으나 설명은 아래 툴을 기준으로 설명합니다.

</aside>

- Google Chrome
    
    [Chrome 웹브라우저](https://www.google.com/intl/ko_kr/chrome/)
    
- VSCode(Visual Studio Code)
    
    [Visual Studio Code - Code Editing. Redefined](https://code.visualstudio.com/)
    
    1. VSC를 설치한다.
    
    2. 바탕화면에 수업용 새 폴더를 생성한다.
    
    3. VSC에서 해당 폴더를 열어준다. (폴더 드래그앤드랍 or `File > Open Folder`)