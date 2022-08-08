
const IMAGE_URL = 'https://image.tmdb.org/t/p/original/'
const UPCOMING_MOVIES = 'https://api.themoviedb.org/3/movie/now_playing'
const API_KEY = '93479ec954971eca6bde81ea710d13a2'
const placeholder = "https://wallpaper.dog/large/20493446.jpg"
const allGenres =  [
    {"id": 12, "name": "Adventure"},
    {"id": 14, "name": "Fantasy"},
    {"id": 16, "name": "Animation"},
    {"id": 18, "name": "Drama"},
    {"id": 27, "name": "Horror"},
    {"id": 28, "name": "Action"},
    {"id": 35, "name": "Comedy"},
    {"id": 37, "name": "Western"},
    {"id": 36, "name": "History"},
    {"id": 53, "name": "Thriller"},
    {"id": 80, "name": "Crime"},
    {"id": 99, "name": "Documentary"},
    {"id": 878, "name": "Science Fiction"},
    {"id": 9648, "name": "Mystery"},
    {"id": 10402, "name": "Music"},
    {"id": 10749, "name": "Romance"},
    {"id": 10751, "name": "Family"},
    {"id": 10752, "name": "War"},
    {"id": 10759, "name": "Action & Adventure"},
    {"id": 10762, "name": "Kids"},
    {"id": 10763, "name": "News"},
    {"id": 10764, "name": "Reality"},
    {"id": 10765, "name": "Sci-Fi & Fantasy"},
    {"id": 10766, "name": "Soap"},
    {"id": 10767, "name": "Talk"},
    {"id": 10768, "name": "War & Politics"},
    {"id": 10770, "name": "TV Movie"},

]
//data
async function getPopularMovies(page = 1) {
    function getGenre(ids){

        return ids.map(it => allGenres.filter(ma=>ma.id===it)[0].name)
    }
    let data;
    try {
        const response = await fetch(`${UPCOMING_MOVIES}?api_key=${API_KEY}&page=${page}`)
        const responseData = await response.json()

        data = {}
        data.page = responseData.page
        data.totalPages = responseData.total_pages
        data.totalEntries = responseData.total_results
        data.entries = responseData.results.map(
            it=>{
                let name = it.title
                let rating_actual = Math.abs(it.vote_average)%10
                let rating = `(${it.vote_average})`
                for (let i = 0; i <Math.abs(it.vote_average)%10; i++) {
                    rating= "⭐" +rating
                }
                let genre = getGenre(it.genre_ids)
                let desc = it.overview
                let image = ""
                if(it.poster_path!=null) image = IMAGE_URL+it.poster_path
                else if(it.backdrop_path!=null) image = IMAGE_URL+it.backdrop_path
                else image = placeholder
                return {name:name,ratingMain:rating_actual ,rating:rating, genre:genre, description: desc, image : image}
            }
        )
    } catch (error) {
        console.log(error)
        data = []
    }
    return data
}

function truncate(input) {
    if (input.length > 300) {
        return input.substring(0, 300) + '...';
    }
    return input;
}

function updateBookMarksInStorage(){
    localStorage.setItem("BOOKMARKS",JSON.stringify(BOOKMARKS))

}
function getBookMarksFromStorage(){
    let data = localStorage.getItem("BOOKMARKS")
    let js = data == null ? [] : JSON.parse(data)
    console.log("data", js)
    return js
}

let BOOKMARKS=getBookMarksFromStorage()
let CURR_PAGE=1

function containsBookMark(movieJS){
    return BOOKMARKS.filter(note =>note.name===movieJS.name).length!==0
}

function addToBookMarks(movieJS){
    if(!containsBookMark(movieJS)) {
        console.log("adding movie to bookmarks ",movieJS.name)
        BOOKMARKS.push(movieJS)
        console.log("new bookmarks=",BOOKMARKS.map(it=>it.name))
        updateBookMarksInStorage()
    }
    else{
        console.log(",movie already present ",movieJS.name)
    }

}
function removeFromBookMarks(movieJS){
    console.log("removing movie from bookmarks ", movieJS.name)

    let remaininbBookMarks = BOOKMARKS.filter(note => note.name !== movieJS.name)
    console.log("remainingNotes", remaininbBookMarks)
    BOOKMARKS = remaininbBookMarks
    updateBookMarksInStorage()
    console.log("new bookmarks=", BOOKMARKS.map(it => it.name))

}


//ui util
function createElementFromHTML(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}


function createMovie(movie = {name:"", rating:"", genre:["",""], description: "", image : ""}, isSelected=false){
    let selectedCss = (isSelected)? "bt_like_selected" :  "bt_like_unselected"
    let heart = (isSelected)? "fa" :  "fa-regular"
    let ui = `
              <article class="card_4">
                    <img src="${movie.image}" loading="lazy" placeholder="">
                    <div class="card_details">
                        <p class="h5">${movie.name}</p>
                        <p class="card_data hide">${JSON.stringify(movie)}</p>
                        <button class="h4 bt_like ${selectedCss}"><i class="${heart} fa-heart"></i></button>
                    </div>
                </article>
    `
    return createElementFromHTML(ui)
}



async function updateUpcomingMoviesOnUi(page=1){
    CURR_PAGE = page
    let data = await getPopularMovies(CURR_PAGE)
    let entriesAndUi=data.entries.map(
        it=>createMovie(it,BOOKMARKS.filter(bm=>bm.name===it.name).length!==0)
    )

    //set static data
    document.querySelector('.sec_t_list').replaceChildren(...entriesAndUi)
    document.querySelector('#sp_page_current').textContent = data.page
    document.querySelector('#sp_page_total').textContent = data.totalPages
    document.querySelector('#sp_page_resultcount').textContent = data.totalEntries

    if(CURR_PAGE <=1 && !btPrev.classList.contains('hide')){
        btPrev.classList.add('hide')
    }
    else{
        btPrev.classList.remove('hide')
    }

    if(CURR_PAGE ===data.totalPages && !btLast.classList.contains('hide')){
        btLast.classList.add('hide')
    }
    else{
        btLast.classList.remove('hide')
    }

    //set button clicks
    document
        .querySelectorAll('.bt_like')
        .forEach(element => element.addEventListener('click',
                () => {
                    console.log('click called for element:',element)
                    let movie = element.parentElement.querySelector('.card_data').textContent
                    console.log("movie json=",movie)
                    let movieJS = JSON.parse(movie)
                    console.log(movieJS)
                    if(element.classList.contains('bt_like_selected')){
                        element.classList.replace('bt_like_selected',"bt_like_unselected")
                        element.querySelector('.fa-heart').classList.replace('fa','fa-regular')
                        removeFromBookMarks(movieJS)

                    }
                    else {
                        element.classList.replace('bt_like_unselected',"bt_like_selected")
                        element.querySelector('.fa-heart').classList.replace('fa-regular','fa')
                        addToBookMarks(movieJS)
                    }
                }
            )
        )

}
updateUpcomingMoviesOnUi(1)
const btPrev = document.querySelector('#bt_pageprevious')
const btLast = document.querySelector('#bt_pagenext')
const btHome = document.querySelector('#bt_page1')

const onNextClick = () => {
    console.log("onNextClick:requesting page:", CURR_PAGE + 1)
    updateUpcomingMoviesOnUi(CURR_PAGE + 1)
    window.scrollTo(0,0)
}
const onPreviousClick =  ()=>{
    console.log("onPreviousClick: requesting page:",CURR_PAGE-1)
    updateUpcomingMoviesOnUi(CURR_PAGE-1)
    window.scrollTo(0,0)

}
const onHomeClick =() => {
    console.log("onHomeClick : requesting page:", 1)
    updateUpcomingMoviesOnUi(1)
    window.scrollTo(0,0)

}
btLast.addEventListener('click', onNextClick)
btPrev.addEventListener('click',onPreviousClick)
btHome.addEventListener('click',onHomeClick)


let searchedGenre="all";
let searchedMaxRating=-1;
let searchedText=""//todo takout bookmarks

function updateBookmarksListingOnUI(){
    function getAll(){
        let all = BOOKMARKS
        all = all.sort((a,b)=>b.ratingMain-a.ratingMain)
        return  all
    }

    console.log(`called with values:'${searchedGenre}' , '${searchedMaxRating}' , '${searchedText}'`)


    let filtered1 = getAll()
    if(searchedGenre.toLowerCase()!=='all'){
        filtered1 = filtered1.filter(it=>it.genre.indexOf(searchedGenre)>-1)
    }
    else{
        filtered1 = getAll()
    }
    if(searchedMaxRating!==-1){
        filtered1 = filtered1.filter(it =>{
            let ceil = (Math.ceil( it.ratingMain))
            let floor = Math.floor( it.ratingMain)
            console.log("rating main=",it.ratingMain)
            console.log("rating main floor =",floor)
            console.log("rating main ceil =",ceil)
            return ceil<=searchedMaxRating
        })
    }
    else{
        filtered1 = filtered1.filter(it=>it.ratingMain<=10)
    }

    if(searchedText!==""){
        filtered1 = filtered1.filter(it => it.name.includes(searchedText)||it.description.includes(searchedText))
    }
    console.log(filtered1)


    function searchedCard(movie){
        let ui = `
                <article class="s_card_4">
                    <div class="s_card_title">
                        <p class="h4">${movie.name}</p>
                        <button class="h4 bt_trash"><i class="fa fa-trash"></i></button>
                        <span class="card_data_bk hide">${JSON.stringify(movie)}</span>
                    </div>

                    <div class="s_card_details">
                        <div class="scd_img_group">
                            <img src="${movie.image}">
                            <div class="h5">
                                <p><b>Genre:</b><span class="sc_genre">${movie.genre.join(', ')}</span></p>
                                <p><b>Rating:</b><span class="sc_rating">${movie.rating} </span></p>
                            </div>
                        </div>
                        <p class="h5"><b>Description:</b></p>
                        <p class="h5"><span class="sc_desc">${truncate(movie.description)}</span></p>
                        </ul>
                    </div>
                </article>
        `
        return createElementFromHTML(ui)
    }

    let entriesAndUi=filtered1.map(it=>searchedCard(it))
    document.querySelector('.search_results').replaceChildren(...entriesAndUi)
    document.querySelectorAll('.bt_trash').forEach(
        btn=>btn.addEventListener('click',()=>{
            let movie = btn.parentElement.querySelector('.card_data_bk').textContent
            console.log("movie json=",movie)
            let movieJS = JSON.parse(movie)
            removeFromBookMarks(movieJS)
            updateBookmarksListingOnUI()
        })
    )


}



function addGenres(){
   let genres = []
    genres.push(`<li class="listitem_genre listitem_selected">All</li>`)

    allGenres.filter(it => {
        let name = `<li class="listitem_genre">${it.name}</li>`
        genres.push(name)
        }
    )
    let entriesAndUi = genres.map(it=>createElementFromHTML(it))

    document.querySelector('.list_genres').replaceChildren(...entriesAndUi)

    document.querySelectorAll('.listitem_genre').forEach(btn=>{
        btn.addEventListener('click',it=>{
            document.querySelectorAll('.listitem_genre').forEach(it=>it.classList.remove('listitem_selected'))
            btn.classList.add('listitem_selected')
            searchedGenre = btn.textContent
            updateBookmarksListingOnUI()
        })
    })

}

function addListenersOnStars(){
    function removeAllSelections(){
        document.querySelectorAll('.rating').forEach(it=>it.classList.remove('rating_selected'))
    }
    let starAll= document.querySelector('.rating_all');
    let star1= document.querySelector('.rating_s1');
    let star2= document.querySelector('.rating_s2');
    let star3= document.querySelector('.rating_s3');
    let star4= document.querySelector('.rating_s4');
    let star5= document.querySelector('.rating_s5');
    let star6= document.querySelector('.rating_s6');
    let star7= document.querySelector('.rating_s7');
    let star8= document.querySelector('.rating_s8');
    let star9= document.querySelector('.rating_s9');
    let star10= document.querySelector('.rating_s10');
    let stars= [star1,star2,star3,star4,star5,star6,star7,star8,star9,star10]
    starAll.addEventListener('click',()=>{
        removeAllSelections()
        starAll.classList.add('rating_selected')
        searchedMaxRating = -1
        updateBookmarksListingOnUI()
    })
    star1.addEventListener('click',()=>{
        removeAllSelections()
        searchedMaxRating = 1
        stars.slice(0,1).forEach(it=>it.classList.add('rating_selected'))

        updateBookmarksListingOnUI()//'1'
    })
    star2.addEventListener('click',()=>{
        removeAllSelections()
        searchedMaxRating = 2
        stars.slice(0,2).forEach(it=>it.classList.add('rating_selected'))
        updateBookmarksListingOnUI()//'2'
    })

    star3.addEventListener('click',()=>{
        removeAllSelections()
        searchedMaxRating = 3
        stars.slice(0,3).forEach(it=>it.classList.add('rating_selected'))
        updateBookmarksListingOnUI()//3
    })

    star4.addEventListener('click',()=>{
        removeAllSelections()
        searchedMaxRating = 4
        stars.slice(0,4).forEach(it=>it.classList.add('rating_selected'))
        updateBookmarksListingOnUI()//3
    })
    star5.addEventListener('click',()=>{
        removeAllSelections()
        searchedMaxRating = 5
        stars.slice(0,5).forEach(it=>it.classList.add('rating_selected'))
        updateBookmarksListingOnUI()//3
    })

    star6.addEventListener('click',()=>{
        removeAllSelections()
        searchedMaxRating = 6
        stars.slice(0,6).forEach(it=>it.classList.add('rating_selected'))
        updateBookmarksListingOnUI()//3
    })

    star7.addEventListener('click',()=>{
        removeAllSelections()
        searchedMaxRating = 7
        stars.slice(0,7).forEach(it=>it.classList.add('rating_selected'))
        updateBookmarksListingOnUI()//3
    })

    star8.addEventListener('click',()=>{
        removeAllSelections()
        searchedMaxRating = 8
        stars.slice(0,8).forEach(it=>it.classList.add('rating_selected'))
        updateBookmarksListingOnUI()//3
    })


    star9.addEventListener('click',()=>{
        removeAllSelections()
        stars.slice(0,9).forEach(it=>it.classList.add('rating_selected'))
        searchedMaxRating = 9
        updateBookmarksListingOnUI()//3
    })
    star10.addEventListener('click',()=>{
        removeAllSelections()
        stars.forEach(it=>it.classList.add('rating_selected'))
        updateBookmarksListingOnUI()//3
        searchedMaxRating = 10
    })

}

function addListenerOnTextFilter(){
    document.querySelector("#search_text").addEventListener('input',(e)=>{
        searchedText = e.target.value
        updateBookmarksListingOnUI()
    })

}


const trending = document.querySelector('#bt_trending')
const cms = document.querySelector('#bt_cms')
trending.addEventListener('click', () => {
    trending.classList.add('bt_selected')
    document.querySelector('.sec_trending_movies').classList.remove('hide')
    cms.classList.remove('bt_selected')
    document.querySelector('.sec_cms').classList.add('hide')
})


cms.addEventListener('click',
    () => {
        cms.classList.add('bt_selected')
        document.querySelector('.sec_cms').classList.remove('hide')
        trending.classList.remove('bt_selected')
        document.querySelector('.sec_trending_movies').classList.add('hide')
        searchedText = ''
        searchedGenre = 'all'
        searchedMaxRating = -1
        addGenres()
        addListenersOnStars()
        addListenerOnTextFilter()
        updateBookmarksListingOnUI()

    }
)

//todo genre not working, text search not working
//todo delete click
//todo persistance
// todo ui issue on trend listing : heart button hawa me udta jaye

