import pic_placeholder from "../images/pic_placeholder.jpg";
import React from "react";
import {JSUtils} from "../utils/js_utils";

export function SingleBookMark({content,onDeleteClick}) {
    return (
        <article key={content.id} className="s_card_4">
            <div className="s_card_title">
                <p className="h4">{content.name}</p>
                <button className="h4 bt_trash" onClick={()=>onDeleteClick(content)}><i className="fa fa-trash"></i></button>
            </div>
            <div className="s_card_details">
                <div className="scd_img_group">
                    <img src={content.image} alt="card" loading="lazy" placeholder={pic_placeholder}/>
                    <div className="h5">
                        <p>Genre:</p>
                        <p>{content.genre.join(', ')}</p>
                        <p>Rating:</p>
                        <p>{content.rating}</p>
                    </div>
                </div>
                <p className="h5"><b>Description:</b></p>
                <p className="h5">
                    <span className="sc_desc">{JSUtils.truncate(content.description)}</span>
                </p>

            </div>
        </article>
    )
}
