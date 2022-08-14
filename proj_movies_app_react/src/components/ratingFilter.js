import {useEffect, useState} from "react";

export function RatingFilter({initialSelected, onSelectionChange}) {
    const [currentSelected,updateSelected]=useState(initialSelected)
    useEffect(()=>onSelectionChange(currentSelected),[currentSelected])

    function getCss(btnNumber){
        if(btnNumber<=currentSelected) return "bt bt_flat bt_pill rating rating_selected"
        else return "bt bt_flat bt_pill rating"
    }
    function getText(){
        if(currentSelected===10) return "All Ratings"
        else return `At most ${currentSelected} stars`
    }

    function getBtnText(btnNumber){
        if(currentSelected===btnNumber) return <span>{btnNumber}</span>
        else return ""
    }


    return (
        <div className="filter_rating">
            <p className="h5">Filter by Rating: {getText()} </p> <br/>
            <div className="ratings_group">
                <button className={getCss(1)} onClick={()=>updateSelected(1)}><i className="fa fa-star "/>{getBtnText(1)}</button>
                <button className={getCss(2)} onClick={()=>updateSelected(2)}><i className="fa fa-star "/>{getBtnText(2)}</button>
                <button className={getCss(3)} onClick={()=>updateSelected(3)}><i className="fa fa-star "/>{getBtnText(3)}</button>
                <button className={getCss(4)} onClick={()=>updateSelected(4)}><i className="fa fa-star "/>{getBtnText(4)}</button>
                <button className={getCss(5)} onClick={()=>updateSelected(5)}><i className="fa fa-star "/>{getBtnText(5)}</button>
                <button className={getCss(6)} onClick={()=>updateSelected(6)}><i className="fa fa-star "/>{getBtnText(6)}</button>
                <button className={getCss(7)} onClick={()=>updateSelected(7)}><i className="fa fa-star "/>{getBtnText(7)}</button>
                <button className={getCss(8)} onClick={()=>updateSelected(8)}><i className="fa fa-star "/>{getBtnText(8)}</button>
                <button className={getCss(9)} onClick={()=>updateSelected(9)}><i className="fa fa-star "/>{getBtnText(9)}</button>
                <button className={getCss(10)} onClick={()=>updateSelected(10)}><i className="fa fa-star"/>{getBtnText(10)}</button>
            </div>

        </div>
    )
}
