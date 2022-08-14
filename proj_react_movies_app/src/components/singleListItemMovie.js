import React, {useEffect, useState} from "react";
import './../index.css';
import pic_placeholder from "../images/pic_placeholder.jpg"
import {Bookmarks} from "../datasource/bookmarks";

export function SingleListItemMovie({content}) {
    const [liked, setLiked] = useState(false)
    function updateLike() {
        console.log("useEffect or button  calls updateLike ")
        liked ?  Bookmarks.removeFromBookMarks(content) :  Bookmarks.addToBookMarks(content)
        setLiked(!liked)
    }
    useEffect(()=>setLiked(content.isBookMarked),[content])
    const btnUiClass = liked ? "bt_like_selected" : "bt_like_unselected"
    const iconUiClass = liked ? "fa" : "fa-regular"

    return (
        <article key={content.id} className="card_4">
            <button className={"h5 bt_like " + btnUiClass} onClick={updateLike}><i className={iconUiClass + " fa-heart"}/></button>
            <img src={content.image} alt="card" loading="lazy" placeholder={pic_placeholder}/>
            <div className="card_title">
                <p className="h5">{content.name}</p>
            </div>
        </article>
    )
}
