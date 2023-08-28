// 전역변수
const mainWrapper = document.querySelector('.wrapper')
const displayBible = document.querySelector('.scripture')
const scriptureList = document.querySelector('.scripture-list')
const buttons = document.querySelector('.buttons')
const burgerButton = document.querySelector('.material-symbols-outlined')
const navButtons = document.querySelector('.nav-btns')
const mobileBackground = document.querySelector('.mobile-background')

let serverData = []
let chapter = []
let pageNum = 1


//  서버 데이터 가져오는 함수수
async function getBibleData(){
    try{
    const data = await fetch('http://127.0.0.1:3300/api/bible/')
    const bibleData = await data.json()
    serverData.push(bibleData)
    console.log(serverData[0])
}catch(error){
    console.log(error)
}
} 

/* 화면에 서버데이터 표시하는 함수 - 시작*/ 

// 성경의 각 책이름을 클릭하면 본문을 보여주는 함수
async function showClikedBook(e){  
function deleteTitle(){
    const bookTitle = mainWrapper.querySelector('.book-title')
    if(bookTitle) mainWrapper.removeChild(bookTitle) // 새로운 성경책 클릭시 기존 타이틀 삭제, if(bookTitle) 안하면 생성간격차이로 오류발생
}
    e.stopPropagation()
    chapter = []
    await getBibleData()
    
    if(e.target.className == 'book'){   // 빈공간 클릭시 작동하지 않도록 설정  
// 출처 표시 : 대한성서공회, 개역한글
function diplaySource(){
    const source = document.createElement('h4')
    source.innerText = '개역한글[대한성서공회]'
    source.className = 'source'
    mainWrapper.insertAdjacentElement('beforebegin', source)
}      
// 성경책 이름 가져오기 (for문 안에 넣으면 안된다)
 function createTitle(firstPage){
        console.log(firstPage)
        const bookTitle = document.createElement('h3')
        bookTitle.className = 'book-title'
        bookTitle.innerHTML = `${e.target.innerText}&nbsp${firstPage}장` 
        mainWrapper.insertAdjacentElement('afterbegin', bookTitle) // 본문 위에 삽입
    }
    diplaySource()
    deleteTitle()
    createTitle(pageNum)
// 첫 화면은 1장을 가져오도록 설정 
    function createfirstPage(firstPage, i){
        { 
        if( e.target.id == serverData[0]?.bibles[i]?.book
            && serverData[0].bibles[i].chapter == firstPage) { 
                displayVerse(i)
            }
        }
        }
// 챕터 수 대로 하단 페이지 넘버 부여            
async function createdPageNum(i){
    if(e.target.id == serverData[0]?.bibles[i]?.book &&
    !chapter.includes(serverData[0]?.bibles[i]?.chapter)){ // 중복되는 값들은 push를 안해주게 설정
    chapter.push(serverData[0].bibles[i].chapter)
}
}
       for(let i=0; i<serverData[0].bibles.length; i++){
            scriptureList.style.display = 'none'
            createdPageNum(i)       
            createfirstPage(1 ,i)    
          }
//   console.log(chapter) 디버깅용 for문 밖에서 조회해야 한다

// 페이지 이동버튼 - 작업중 미완료
const prevButton = document.createElement('button')
const nextButton = document.createElement('button')
prevButton.innerHTML = `&#129120;`
nextButton.innerHTML = `&#129122;`
prevButton.classList.add('prev-button')
nextButton.classList.add('next-button')
buttons.insertAdjacentElement('beforebegin', prevButton)
buttons.insertAdjacentElement('afterend', nextButton)
nextButton.addEventListener('click', () => plusPage(e, e.target.id))
prevButton.addEventListener('click', () => minusPage(e, e.target.id))
}

// 하단 페이지 이동하기 기능
let num = 0
let plusNum = 10
let pages = chapter.slice(num, num + plusNum)
let firstPage = []

function plusPage(e, bookId, pages, firstPage){  // 이곳에 매개변수로 사용하면 배열push가 안되고 외부에서 호출시 undefined된다
    if(chapter.length - plusNum > num){ // 왜 이조건하나 생각을 못했을까
    buttons.innerHTML = ''
    displayBible.innerText =''
    num+=plusNum
    pages = chapter.slice(num, num + plusNum)
    firstPage = pages[0]  // 이 값을 createfirstPage 함수의 인자값으로 사용하려면 어떻게 하지?
    createdPageNation(bookId, pages)
   
    deleteTitle()
    createTitle(firstPage)

    for(let i=0; i<serverData[0].bibles.length; i++){ // 데이터를 찾아서 실행해줘야하는데 이 for문이 없어서 
        scriptureList.style.display = 'none'
        createfirstPage(firstPage ,i)    // 이 함수가 실행되지 않았던 것임
      }
} // 이곳에 return firstpage를 해도 아무 소용이 없네 => 이벤트 핸들러 함수는 return 이 안된다
}
function minusPage(e, bookId, pages, firstPage){
    if(num >= plusNum){ 
    buttons.innerHTML =''
    displayBible.innerText =''


    num-=plusNum
     pages = chapter.slice(num, num + plusNum)
     firstPage = pages[0]
     createdPageNation(bookId, pages)
     
     deleteTitle()
     createTitle(firstPage)
     console.log(firstPage)
     for(let i=0; i<serverData[0].bibles.length; i++){
        scriptureList.style.display = 'none'
        createfirstPage(firstPage ,i)    
      }
    }
}


// 하단 페이지버튼 마운트 생성
          async function createdPageNation(bookId, pages){ // 버튼을 for문 밖에서 생성해야 한다, bookId 이름은 아무거나 상관없고 이 값은 복사된 e.target.id 이다
//    console.log(bookId, pages) // 디버깅용
            pages.forEach((btn) => {
                const pageButton = document.createElement('button')
                pageButton.classList.add('button')       
                pageButton.innerText = btn   
                const firstBtn = document.querySelectorAll('.buttons button')[0]
                firstBtn?.classList.add('active')      // 첫페이지 버튼 클릭되어있도록 설정
                buttons.appendChild(pageButton)

// 하단 페이지버튼 클릭이벤트 시작            
        pageButton.addEventListener('click', function(e){
// 클릭한 요소 외의 버튼은 non-active 설정하기
                    const buttonGroup = this.parentNode
                    const active = buttonGroup.querySelector('.active')
                    
                    pageNum = e.target.innerText
                    console.log(pageNum)
                    if(active){
                        active.classList.remove('active')
                        displayBible.innerHTML =''
                      } e.currentTarget.classList.add('active')
                      deleteTitle()
                      createTitle(pageNum)


// Chapter에 해당하는 Verse만 마운트하기 (Chapter는 하단 페이지 넘버와 동일)
                    for(let i=0; i<serverData[0].bibles.length; i++){
                        if( bookId == serverData[0].bibles[i].book
                            && this.innerText == serverData[0].bibles[i].chapter
                            && this.className == 'button active'
                            ){
                             displayVerse(i)
                            }
                        }
                        console.log(pageNum)
                       return pageNum         // 이건 의미가 있나?              
                })                            
        })
        }
        pages = chapter.slice(num, num + plusNum) // 이걸 왜 작성한거지
        createdPageNation(e.target.id, pages) // 함수 파라미터 전달 showClikedBook의 e.target.id를 createdPageNation 함수 안에서 사용하기 위해 입력 
       
    }


scriptureList?.addEventListener('click', showClikedBook) // 성경의 각 책이름을 클릭하면 본문을 보여주는 함수

// Verse 표시하기
function displayVerse(parameter){ 
    const bibleContents = document.createElement('div')
    bibleContents.innerHTML = `${serverData[0].bibles[parameter].verse}&nbsp${serverData[0].bibles[parameter].content}`
    bibleContents.className = 'bible-contents'
    displayBible.appendChild(bibleContents)
}


/*뒤로가기 구현 - 어중간한 구현 */
// 문제점 : 1) 본문 페이지 여러번 클릭하고 나서 뒤로가기 하면 화면 백지화됨 -> 뒤로가기 2번눌러야함
// 2) 앞으로 가기는 안먹힌다.. 앞으로 가기 하면 다시 컨텐츠 나와야하는데

window.onpopstate  = function(event) {
    event.stopPropagation()
    // console.log(event)
if(!(event && window.location.href.includes('#'))){    
    scriptureList.style.display = 'flex' // 뒤로가기 했을때 목차 다시나오기
    // pushstate('', '', 'readbible')
    const bibleContents = document.querySelectorAll('.bible-contents') // 뒤로가기 했을때 성경본문 삭제
    bibleContents.forEach((content)=> {
        content.remove()
    })    

    const pageButton = document.querySelectorAll('button') // 뒤로가기 했을때 하단 페이지네이션 삭제
    pageButton.forEach(btn => btn.remove())
 
    const bookTitle = mainWrapper.querySelector('.book-title')
    if(bookTitle) mainWrapper.removeChild(bookTitle)  // 뒤로가기 했을때 타이틀 삭제
}

}
   

// 모바일 버거버튼 클릭시
burgerButton.addEventListener('click',(e) => {
    console.log(e.target, '버튼')
    navButtons.classList.toggle('show')
    mobileBackground.classList.toggle('show')
})