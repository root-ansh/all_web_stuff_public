import {useEffect, useState} from "react";
import {SortByOptions} from "../datasource/sortByOptions";

export function SortByFilter({initialSelected, onSelectionChange}) {
    const [currentSelected,updateSelected]=useState(initialSelected)
    useEffect(()=>onSelectionChange(currentSelected),[currentSelected])
    function getCss(btnValue){
        if(btnValue===currentSelected) return "listitem_genre listitem_selected2"
        else return "listitem_genre"
    }
    let currentGenreList = Object.keys(SortByOptions).map(
        it=>{
            let value = SortByOptions[it]
            return <li key={value} className={getCss(value)} onClick={()=>updateSelected(value)}>{value}</li>
        }
    )


    return (

        <div className="genre_group2">
            <p className="h5">Sort By:</p>
            <ul className="list_genres">
                {currentGenreList}
            </ul>
        </div>
    )
}
