import {Genres} from "./genres";
import {Bookmarks} from "./bookmarks";
const IMAGE_URL = 'https://image.tmdb.org/t/p/original'
const placeholder =null

export async function getMoviesAsync(url) {
    let filters = Object.keys(Genres).map(it=>Genres[it])
    function getGenre(ids){

        return ids.map(it => filters.filter(ma=>ma.id===it)[0].name)
    }
    let data;
    try {
        const response = await fetch(url)
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

                let bookMarked = Bookmarks.containsBookMarkName(name)
                return {
                    name:name,
                    ratingMain:rating_actual ,
                    rating:rating,
                    genre:genre,
                    description: desc,
                    image : image,
                    isBookMarked : bookMarked
                }
            }
        )
    } catch (error) {
        console.log(error)
        data = []
    }
    return data
}
