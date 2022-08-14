import React from "react";
import './../index.css';

export function MoviePagination({currentPg, totalPg, totalResults, onButtonClick}) {
    return (
        <>
            <div className="space_400"/>

            <div className="sec_pagination">
                <p className="h5">
                    You are currently viewing page &nbsp;
                    <span id="sp_page_current">{currentPg}&nbsp;</span>of &nbsp;
                    <span id="sp_page_total">{totalPg}&nbsp;</span>( <span id="sp_page_resultcount">{totalResults}&nbsp;</span> results)
                </p>
                <p className="">
                    <button id="bt_pageprevious" className="bt bt_pill" onClick={() => onButtonClick(currentPg>1?(currentPg - 1):(1))}><i className="fa fa-arrow-left"></i><span>Previous</span></button><span>&nbsp;&nbsp;&nbsp;</span>
                    <button id="bt_page1" className="bt bt_pill bt_selected" onClick={() => onButtonClick(1)}><i className="fa fa-home"/><span>Home</span></button><span>&nbsp;&nbsp;&nbsp;</span>
                    <button id="bt_pagenext" className="bt bt_pill" onClick={() => onButtonClick(currentPg + 1)}><span>Next</span><i className="fa fa-arrow-right"/></button>
                </p>
            </div>
        </>
    )
}
