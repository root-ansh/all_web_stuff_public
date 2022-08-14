import {useEffect, useState} from "react";
import {Genres} from "../datasource/genres";

export function GenreFilters({initialSelected, onSelectionChange}) {
    const [currentSelected,updateSelected]=useState(initialSelected)
    useEffect(()=>onSelectionChange(currentSelected),[currentSelected])

    function getCss(btnNumber){
        if(btnNumber===currentSelected) return "listitem_genre listitem_selected"
        else return "listitem_genre"
    }


    let currentGenreList = Object.keys(Genres).sort().map(
        it=>{
            let obj = Genres[it]
            let id = obj.id;
            let name= obj.name
            return <li key={id} className={getCss(obj)} onClick={()=>updateSelected(obj)}>{name}</li>
        }
    )

    return (
        <div className="genre_group">
            <p className="h5">Filter by Genre:</p> <br/>
            <ul className="list_genres">
                {currentGenreList}
            </ul>
        </div>
    )
}

