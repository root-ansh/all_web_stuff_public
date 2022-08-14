import {SingleListItemMovie} from "./singleListItemMovie";
import {MoviePagination} from "./moviePagination";
import React, {useEffect, useState} from "react";
import './../index.css';
import {getCurrentUrl} from "../utils/getCurrentUrl";
import {getMoviesAsync} from "../datasource/getMoviesAsync";
import {useLocation} from "react-router-dom";


//history : by keeping in url

export function MovieListSection() {
    let routerLink =useLocation().pathname // /trending/2

    let [currentInfo, updateInfo] = useState(
        {page: 1, totalPages: 1, totalEntries: 0, entries: []}
        //{currentDataUrl: getCurrentUrl(routerLink, 1), currentData: {page: 1, totalPages: 1, totalEntries: 0, entries: []}}
    )
    const updateDataInStateForRouterChange = ()=>{
        async function asyncUpdateDataInState(){
            let data = await getMoviesAsync(getCurrentUrl(routerLink,1)) // will set// getCurrentUrl(routerLink, 1),
            updateInfo(data)
        }
        window.scrollTo(0,0)
        asyncUpdateDataInState()
    }
    const updateDataInStateForPageChange = ()=>{
        async function asyncUpdateDataInState(){
            let data = await getMoviesAsync(getCurrentUrl(routerLink,currentInfo.page)) // will set// getCurrentUrl(routerLink, 1),
            updateInfo(data)
        }
        window.scrollTo(0,0)
        asyncUpdateDataInState()
    }

    useEffect(updateDataInStateForRouterChange,[routerLink])
    useEffect(updateDataInStateForPageChange,[currentInfo.page])

    function onLikeClick(id, selectionState) {console.log("clicked: id: " + id + ", newState:" + selectionState)}


    function onPaginationClick(requestedPgNum) {// updates state's url ==> resulting in use effect to run
        updateInfo({page: requestedPgNum,totalEntries: currentInfo.totalEntries,totalPages: currentInfo.totalPages,entries: currentInfo.entries})
    }

    let currentEntries = currentInfo.entries
    return (
        <section className="sec_trending_movies">
            <div className="sec_t_list">
                {currentEntries.map(it=>(<SingleListItemMovie content={it} onLikeClick={onLikeClick}/>))}
            </div>
            <MoviePagination
                currentPg={currentInfo.page}
                totalPg={currentInfo.totalPages}
                onButtonClick={onPaginationClick}
                totalResults={currentInfo.totalEntries}
            />

        </section>
    )
}


// page refresh
