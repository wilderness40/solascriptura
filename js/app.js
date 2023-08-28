// 전역변수

const inputWindow = document.getElementById('serachbible')
const searchBtn = document.querySelector('.input-btn')
const ramdomPargraph = document.querySelector('.random-paragraph')
const main = document.querySelector('main')
const footer = document.querySelector('footer')
const contents = document.querySelector('.contents')
const moreViewBtn = document.querySelector('.moreview-btn')
const form = document.querySelector('form')
const burgerButton = document.querySelector('.material-symbols-outlined')
const navButtons = document.querySelector('.nav-btns')
const mobileBackground = document.querySelector('.mobile-background')


let serverData = []
let updateResults = []

// 성경 서버데이터 가져오기
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

// 랜덤 이미지 배경데이터 가져오기
async function getImageData(){
    try{
    const data = await fetch(`https://api.unsplash.com/search/photos?query=background img&page=${Math.floor(Math.random()*334)}&per_page=35&client_id=NNmNL2OOluBZlE9VpvVPQKXW7p0vm0dCkz2n8dFIAUA&;`) // page랜덤설정 총페이지수 334페이지
    const imgData = await data.json()

    for(let i = 0; i < imgData.results.length; i++){
    ramdomPargraph.style.backgroundImage = `url(${imgData.results[Math.floor(Math.random() * i)]?.urls.regular})`
}
}catch(error){
    console.log(error)
}
}

// 성경 랜덤 구절 
// 배경이미지는 pixabay나 unsplash에서 랜덤으로 떙겨오자, 특정 키워드의 이미지만 떙겨오도록 설정
async function createRandomVerse(){
    await getBibleData()
    await getImageData()
    const h3 = document.createElement('h3')
    const randomNum = Math.floor(Math.random() * 31102)
    h3.innerHTML = `${serverData[0].bibles[randomNum].content}<br><p>${serverData[0].bibles[randomNum].title}&nbsp${serverData[0].bibles[randomNum].chapter}장 ${serverData[0].bibles[randomNum].verse}절</p>`

    ramdomPargraph.appendChild(h3)
    }
    
    createRandomVerse()


// 인풋창 입력이벤트 - 검색버튼을 클릭하면 성경읽기 html로 이동하여 검색어와 일치되는 내용을 표시해야한다.

inputWindow.addEventListener('change', async(e) => {
    const searchWord= e.target.value.trim()
    localStorage.setItem("inputWord", searchWord)
    
    if(searchWord == '') // || !searchWord || !inputWindow.onfocus 이 조건문들은 왜 안되는거지? / 아무것도 입력안하고 클릭시 폼타입이 제출되어버린다, 일단 html requierd로 막는다..
    {alert('검색어를 입력해주세요')}

// 검색내용 가져오기 
    else{
        updateResults = serverData[0].bibles.filter(bibles => bibles.content.includes(searchWord))
        return updateResults
    }
    })

// 검색결과가 없으면 form태그가 작동하지 않도록 설정, form 태그에 onsubmit는 event를 못가져와서 아래와 같이 했더니 해결됨 
form.addEventListener('submit', (e) => {
    if(updateResults.length) {return true} // 배열은 빈값도 메모리에 저장하기 때문에 if(updateResults)로 조건문을 작성하면 빈값도 있는것으로 인식함
    else {
        alert('검색결과가 없습니다')
        e.preventDefault()
   }
})    

// 모바일 버거버튼 클릭시
burgerButton.addEventListener('click',(e) => {
    console.log(e.target, '버튼')
    navButtons.classList.toggle('show')
    mobileBackground.classList.toggle('show')

    
})