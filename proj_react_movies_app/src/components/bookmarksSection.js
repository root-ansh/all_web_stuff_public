import {GenreFilters} from "./genreFilters";
import {RatingFilter} from "./ratingFilter";
import {TextFilter} from "./textFilter";
import {SingleBookMark} from "./singleBookMark";
import {SortByFilter} from "./sortByFilter";
import {useEffect, useState} from "react";
import {SortByOptions} from "../datasource/sortByOptions";
import {Genres} from "../datasource/genres";
import {Bookmarks} from "../datasource/bookmarks";

function originalSortedBookMarks(currentSortBy){
    let storage = Bookmarks.getBookMarksFromStorage()
    if(currentSortBy===SortByOptions.RATING_DSC){
        storage = storage.sort((a,b)=>b.ratingMain-a.ratingMain)
    }
    else {
        storage = storage.sort((a,b)=>a.ratingMain-b.ratingMain)
    }
    return storage
}

function getSortedAndFilteredBookMarks(currentSortBy,currentGenre,currentRating,currentSearchText){


    let finalBookMarks = originalSortedBookMarks(currentSortBy)

    if(currentGenre!==Genres.A0_ALL){
        finalBookMarks = finalBookMarks.filter(it=>it.genre.indexOf(currentGenre.name)>-1)
    }
    else{
        finalBookMarks = originalSortedBookMarks()
    }

    finalBookMarks = finalBookMarks.filter(it=>it.ratingMain<=currentRating)

    if(currentSearchText!==""){
        finalBookMarks = finalBookMarks.filter(it => it.name.toLowerCase().includes(currentSearchText.toLowerCase())||it.description.toLowerCase().includes(currentSearchText.toLowerCase()))
    }

    return finalBookMarks

}

export function BookmarksSection() {
    let [currentRating, updateCurrentRating] = useState(10)
    let [currentSearchText, updateCurrentSearchText] = useState("")
    let [currentSortBy, updateCurrentSortBy] = useState(SortByOptions.RATING_DSC)
    let [currentGenre, updateCurrentGenre] = useState(Genres.A0_ALL)
    let [currentBookMarks,updateStorageBookMarks] = useState( getSortedAndFilteredBookMarks(currentSortBy,currentGenre,currentRating,currentSearchText))



    function stateChangerEffect(from){
        if(from==="rti") console.log(`currentRating changed! value= ${currentRating}`)
        if(from==="txt") console.log(`currentSearchText changed! value= ${currentSearchText}`)
        if(from==="sort") console.log(`currentSortBy changed! value= ${currentSortBy}`)
        if(from==="gen") console.log(`currentGenre changed! value= ${currentGenre}`)
        if(from==="del")console.log(`triggering from delete!`)
        updateStorageBookMarks(getSortedAndFilteredBookMarks(currentSortBy,currentGenre,currentRating,currentSearchText))
    }

    useEffect(()=>stateChangerEffect("rti"),[currentRating])
    useEffect(()=>stateChangerEffect("txt"),[currentSearchText])
    useEffect(()=>stateChangerEffect("sort"),[currentSortBy])
    useEffect(()=>stateChangerEffect("gen"),[currentGenre])

    function deleteBookMark(content){
        Bookmarks.removeFromBookMarks(content)
        stateChangerEffect("del")
    }


    let bookMarksList = currentBookMarks.map(
        it => (
            <SingleBookMark key={it.name} content={it} onDeleteClick={deleteBookMark}></SingleBookMark>
        )
    )

    return (
        <section className="sec_cms ">

            <div className="sec_side_bar">
                <h3 className="h4">Apply Filters to your Bookmarks</h3>
                <TextFilter initialText={currentSearchText} onTextChange={it=>updateCurrentSearchText(it)}/>
                <RatingFilter initialSelected={currentRating} onSelectionChange={ it => updateCurrentRating(it)}/>
                <GenreFilters initialSelected={currentGenre} onSelectionChange={ it => updateCurrentGenre(it)}  />
            </div>

            <div className="sec_result_area">
                <SortByFilter initialSelected={currentSortBy} onSelectionChange={ it => updateCurrentSortBy(it)} />
                <div className="search_results">
                    {bookMarksList}
                </div>

            </div>


        </section>
    )
}
