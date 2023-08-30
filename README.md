# Sola-Scriptura 
## 프로젝트명과 기획동기
------------
Sola-Scriptura 라틴어로 '오직 성경으로'라는 뜻 입니다.
루터의 종교개혁 때 [5대 sola](https://ko.wikipedia.org/wiki/%EB%8B%A4%EC%84%AF_%EC%86%94%EB%9D%BC)가 있었는데 그 중 하나입니다. 
첫 프로젝트는 저의 정체성에 대해 생각을 하면서 주제를 선정하게 되었습니다.
크리스찬으로 하나님과 동행하며 영광돌리는 삶을 사는 것이 저의 삶의 가치관입니다.
개발을 잘할 수 있게 되면 크리스찬들에게 도움을 줄 수 있는 웹이나 앱을 만들고 싶습니다.

먼저는 가장 많이 사용하는 성경을 보고 검색할 수 있는 웹사이트를 만들기로 정했습니다.
크리스찬들이 실제적으로 가장 많이 보는 것이 성경이죠. 
사실 대부분 앱을 통해 성경을 보지만 웹으로도 볼 때가 있으니 웹 성경을 택하게 되었습니다.
제가 만든 사이트니까 저 자신이 좀 더 애정을 가지고 성경을 읽게 되지 않을까하는 마음도 있습니다.

### 프로젝트 설명
------------
>많은 성경 웹사이트들이 있지만 성경컨텐츠만 담고 있는 사이트는 많지 않습니다.
대한성서공회, 홀리바이블 정도가 성경컨텐츠만 깔끔하게 담고 있는 사이트인 것 같습니다.

>단순히 성경을 보거나 검색만 된다면 지금 존재하는 사이트들과 차별점이 없으니 성경구절을 암기할 수 있게 하는데 차별점을 두고 싶었습니다.
기존 사이트들도 성경필사나 듣기를 통한 성경 암송 기능은 많이 나와있습니다.
이에 저는 어렸을적 한컴타자에서 경험한 산성비나 낱말퍼즐 게임등을 추가하여 게이밍 요소를 가미하기로 했습니다.
또한 간단한 Todo리스트 기능을 넣어 나의 기도제목을 작성할 수 있게 했습니다.

**본 사이트는 아래의 기능을 제공합니다**
1. 성경을 읽을 수 있습니다.
2. 성경 본문을 검색할 수 있습니다. (현재는 본문 내용만 검색가능)
3. 필사를 할 수 있습니다. (현재는 시편만 가능)
4. 나의 기도제목을 작성할 수 있습니다 (미구현)
5. 성경용어와 관련된 간단한 게임을 할 수 있습니다. (미구현)

### 프로젝트 과정중 어려웠던 점
------------
**1. 함수의 호출 반환 문제**
한 함수에 너무 많은 코드가 들어가 있어서 함수를 전역으로 빼는 과정 중에 스코프 문제로 변수를 인식하지 못하는 일이 종종 일어났다. 
그동안은 전역변수를 만들어서 활용하는 방안으로 했으나, 전역변수의 잦은 사용은 지양하는바 함수 내 변수를 반환하고 구조분해를 통해 다른 함수 내에서도 사용가능하도록 설정하였다.
``` javascript
function example(){
    // 추가로 반환할 버튼 요소들을 생성합니다.
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const retryButton = document.querySelector('.retry');

    // bibleText와 함께 버튼 요소들도 반환합니다.
    return {
        bibleText,
        prevButton,
        nextButton,
        retryButton
    }}

// 다른 함수 내에서 호출하는 예시입니다.
const { bibleText, prevButton, nextButton, retryButton } = example()
```
**2.데이터 생성순서의 문제**
데이터가 많다 보니 데이터가 업로드 되지 않은 시점에서 코드가 실행되어 undefined가 출력되는 문제 발생, 
async await 함수, 로딩화면 추가, 즉시실행 async await 활용하여 해결하였다.
``` javascript
(async() =>await getBibleText())() // 즉시실행 async await
```

**3.필사기능 : 한글자마다 span넣어주기**
inputText와 화면상 표시된 Text를 비교하여 작성이 제대로 되었는지 테스트하는 기능이 필요하였다. 글자 하나마다 정상적으로 입력이 되었는지 오류가 났는지 표시를 하기 위해 한글자씩 span으로 나눠야 하는 작업이 요구되었다. 여러개의 element중에 여러개를 선택하는 작업이 반복되어 조회하는데에도 어려움을 느꼈으나 아래와 같이 split, map, replace, join 메소드를 활용하여 해결하였다. 
// 시편본문 한글자씩 풀어서 span태그로 감싸주기   
``` javascript
    const bibletextParatypingContent.querySelectorAll('.bible-Text p') 
    for(let i=0; i<bibletextPara.length; i++){
        bibletextPara[i].innerHTMLbibletextPara[i].innerText.split('').map(char =>char.replace(char, `<span>${char}</span>`)).join('')
}
```
**4.필사기능 : 입력하는 영역을 본문 글자위로 설정하기, 입력글자와 비교하여 업데이트해주기**
처음에는 textarea 영역을 하단으로 설정했으나 잘 구현된 다른 사이트의 디자인을 참고하여 textarea 입력영역이 본문 위에 덧씌워지는 방식으로 구현하고 싶어졌다. textarea영역은 보이지 않아야하고, 본문의 문단과 쓰여지는 글씨가 정확히 일치하여야 했으며, input.value의 내용과 본문의 span으로 나눠진 글자의 일치/불일치 여부를 판별하여야 했다. 이를 위해 textarea는 보이지 않도록 설정을하고 빈 div를 만들어 textarea의 inputText가 표출되도록 설정했다. textarea와 div는 position: absolute를 설정하여 본문과 사이즈를 맞추고, textarea의 carret만 보이도록 설정하였다. 

글자의 일치여부는 index 값을 활용하였다. 전역변수로 charIndex=0를 설정한뒤
inputText[charIndex] 값과 본문[charIndex] 값을 비교하여 본문의 span 태그의 클래스 상태를 변경하여 일치/불일치 여부를 표시하였다.
``` javascript
if(textSpan[charIndex]?.innerText=== typedText[charIndex]){ // 글자가 일치할 경우
        textSpan[charIndex].innerText=== typedText[charIndex]
        textSpan[charIndex].classList.add('correct')
        textSpan[charIndex].classList.remove('incorrect')
        charIndex++ 
    e.preventDefault()
}
    else if(typedText[charIndex] == null){  // 글자를 지울 때
        textSpan[charIndex].classList.remove('correct','incorrect', 'hide')
        if(charIndex > 0) { charIndex-- }
}
    else if(textSpan[textSpan.length-1]?.className){ //마지막 글자가 입력한 값과 같을때 다음버튼 클릭되도록 혹은 클래스가 있을때
        nextButton.click()
        console.log('마지막글자')
}
    else{   // 글자가 불일치할 경우
        textSpan[charIndex].classList.add('incorrect')
        textSpan[charIndex].classList.remove('correct', 'hide')
        charIndex++
}
```
## 한계점·개선필요사항 
------------
**1. 저작권 문제로 인한 번역본의 제한(번역당 1년 100만원)**
- 저작권이 만료된 개역한글판 데이터만 활용했다, 가장 많이 사용하는 것은 개역개정판으로 해당 번역본이 없으면 사용성이 떨어진다. 비용문제로 인해 한계가 있다.

**2. 검색시 DB로딩시간이 너무 길다**
31,102개의 다큐먼트를 for문을 돌면서 조회하므로 string이라 해도 데이터를 조회하여 DOM생성하는데 오랜시간이 소요된다. 
- 조건 쿼리를 활용하여 데이터 검색을 세분화할 예정
- 로컬에 저장하여 fetch 횟수를 줄인다.
- 기존 DB데이터를 grouping을 통해 세분화 작업을 하여 활용한다.

**3. 필사기능 구현했으나 미흡함**
키 인식 시점의 오류가 있다. 영어와는 다르게 한글자가 자음과 모음의 결합으로 이뤄지기 때문에 한글자가 완성되는 시점을 인식하는데 시차가 발생한다.
input이벤트가 오류가 가장 적어 input이벤트로 작성했으나 input이벤트의 경우 keyboard 이벤트가 아니기 때문에 keycode를 가져올 수 없어 contorl+enter를 통한 제출기능을 활성화 하지 못했으며,
키보드를 계속 누르고 있을 경우 키보드 입력 인식이 늦어서 span class가 한참뒤에 변경되는 오류가 발생한다.

추후 보수시에는 한글 입력의 오차를 맞추기 위해 아래와 같은 시도를 해볼 예정이다.
-  span태그로 나누기전에 문장 내 &nbsp를 인식하여 단어마다 li태그로 감싸준다
-  filter와 includes 메서드를 이용하여, 입력된 값과 li태그의 값을 비교하여 li태그 문장을 생성한다.
-  li 태그 내 글자를 비교하여 span class 업데이트를 한다.
혹은 한글 바이트수를 고려한 조건문 2bytes~3bytes, 영어입력 불가한 조건설정, 유니코드값을 활용 한다.

**4. 뒤로가기 및 url정리**
pushstate를 활용하여 뒤로가기 기능을 구현했으나 앞으로가기버튼을 누르고 뒤로가기를 누를 경우 url은 변경되지만 페이지는 이동하지 않는 경우가 발생함 
- 뒤로가기 버튼만을 인식하는 코드를 발견하지 못함.
- 리액트를 활용하거나 백엔드에서 url를 정해버리는 방법 등을 시도해볼 예정.

**5. 산성비/배틀가로세로 기능**
- 추후 구현예정

**6. 로그인, 로그아웃, 기도노트 기능**
- 추후 구현예정

### 프로젝트 설치 및 실행 방법
------------
프로젝트를 위해 사용한 기술스택은 다음과 같습니다.
html 
css 
javascript 
node.js 18.17.0
mongoDB 6.0.8 
mongosh 1.10.3 

package.json 설치목록
{  
    "axios": "^1.4.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-async-handler": "^1.2.0",
    "jsonwebtoken": "^9.0.1",
    "mongoose": "^7.4.3",
    "morgan": "^1.10.0"
}

### 프로젝트 사용방법
------------
1. 깃허브에 있는  midbar.bibles.json 파일을 MongoDB의 db.midbar.bibles에 업로드 합니다.
2. backend 폴더의 경로 터미널에서 nodemon index.js 를 입력한다. (nodemon이 설치되지 않은 경우 npm i nodemon -g를 입력하여 설치한다)
3. frontend 폴더의 index.html을 라이브 서버로 실행합니다.
4. 사이트 내 조작법은 첨부한 동영상을 참고해주세요.
   
### 출처 및 참고사이트
------------
1.데이터 출처
1) 성경데이터 : [갓피플게시글](https://godpeople.or.kr/index.php?module=file&act=procFileDownload&file_srl=3016468&sid=91debabb17f7f69ad0e7e6a6bff8de38)
2) 랜덤구절이미지 : [Unsplash API](https://api.unsplash.com/)

본 사이트의 성경_개역한글판의 저작권은 대한성서공회에 있습니다.

2. 랜덤구절 배경 외 사진 출처: [pixabay](https://pixabay.com/ko/)
3. 필사기능 벤치마킹 사이트 :
   https://recordofwonseok.tistory.com/345
   https://new.typing.works/
