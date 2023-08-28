// 전역변수
const searchWord = localStorage.getItem('inputWord')
const main = document.querySelector('main')
const footer = document.querySelector('footer')
const contents = document.querySelector('.contents')
const moreViewBtn = document.querySelector('.moreview-btn')
const burgerButton = document.querySelector('.material-symbols-outlined')
const navButtons = document.querySelector('.nav-btns')
const mobileBackground = document.querySelector('.mobile-background')
let serverData = []

// 서버데이터 가져오기
async function getBibleData(){
    try{
    const data = await fetch('http://127.0.0.1:3300/api/bible/')
    const bibleData = await data.json()
    await serverData.push(bibleData)
    console.log(serverData[0])
}catch(error){
    console.log(error)
}
}



/* 검색 결과 보여주기 */    
// 검색 content 표시하기
async function displayContent(updateResults, searchWord){
    for(let i= 0; i < updateResults.length; i++){
        const bookChapter = document.createElement('h4') 
        const searchContent = document.createElement('p')
        
        bookChapter.innerHTML = `${JSON.stringify(updateResults[i].title).replace (/"/g,'')}&nbsp${JSON.stringify(updateResults[i].chapter).replace (/"/g,'')}장&nbsp${JSON.stringify(updateResults[i].verse).replace (/"/g,'')}절`
        searchContent.innerHTML = `${JSON.stringify(updateResults[i].content).replace (/"/g,'')}`
      

       contents.append(bookChapter, searchContent)

// 검색단어 하이라이트 적용하기
        if(searchContent.innerText.includes(searchWord)){
            searchContent.innerHTML = searchContent.innerHTML.split(searchWord).join(`<span class='highlight'>${searchWord}</span>`)            
        }
    }
}


// 검색결과 가져오기
async function showSearchBible(){
    displayLoadingImg() // 로딩화면 보여주기
    await getBibleData() // 서버데이터 가져오기
// 로딩화면 가리고 리스트 보여주기 (데이터 다 가져왔으니)
    const loadingPhrases = document.querySelector('.loading-Phrases') 
    loadingPhrases.remove()

      const updateResults = await serverData[0].bibles.filter(bibles => {
        if(searchWord){
            return bibles.content.includes(searchWord)
      }
      })
// 로딩화면 문구 만드는 함수      
        function displayLoadingImg(){
           const logding = document.createElement('h2')
           logding.innerText ='검색결과를 가져오고 있습니다'
           logding.className = 'loading-Phrases'
           contents.appendChild(logding) 
        }
        
    displayContent(updateResults, searchWord)   
    
}

showSearchBible()

 
 // 모바일 버거버튼 클릭시
burgerButton.addEventListener('click',(e) => {
    console.log(e.target, '버튼')
    navButtons.classList.toggle('show')
    mobileBackground.classList.toggle('show')
})

