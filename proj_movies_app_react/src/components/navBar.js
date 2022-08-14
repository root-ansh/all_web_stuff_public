import movies from "../images/movies.jpg";
import React from "react";
import {BrowserRouter, Link, Route, Routes, useLocation} from "react-router-dom";
import './../index.css';
import {NavBarLinks} from "../datasource/navBarLinks";
import {MovieListSection} from "./movieListSection";
import {BookmarksSection} from "./bookmarksSection";


function NavBar() {
    let selectedRouterLink = useLocation().pathname
    let selectedCss = "h5 bt bt_flat bt_pill bt_selected"
    let unselectedCss = "h5 bt bt_flat bt_pill"
    function getNavLinkSelectedUi(navLink){

        if(selectedRouterLink===NavBarLinks.home.routerLink ||selectedRouterLink===NavBarLinks.trending.routerLink){
            if(navLink===NavBarLinks.home.routerLink|| navLink ===NavBarLinks.trending.routerLink){
                return selectedCss
            }
        }
        let finalVal =  navLink===selectedRouterLink ? selectedCss : unselectedCss
        return finalVal
    }
    return (
        <section className="sec_nav">
            <Link to={NavBarLinks.home.routerLink}>
               <div className="nav_header">
                   <img src={movies} alt="homepage icon"/>
                   <h1 className="h1">Trendy Hub</h1>
               </div>
           </Link>

            <a href="https://github.com/root-ansh/all_web_stuff_public/tree/main/proj_movies_app_react"
               target="_blank"
               className={selectedCss}>
                <i className="fa-brands fa-github"/>
            </a>

            <Link to={NavBarLinks.trending.routerLink}>
                <button className={getNavLinkSelectedUi(NavBarLinks.trending.routerLink)}>
                <i className="fa fa-fire"/><span>Trending Movies</span>
                </button>
            </Link>



            <Link to={NavBarLinks.upcoming.routerLink}>
                <button className={getNavLinkSelectedUi(NavBarLinks.upcoming.routerLink)}>
                    <i className="fa fa-fire"/><span>Upcoming Movies</span>
                </button>
            </Link>

            <Link to={NavBarLinks.top.routerLink}>
                <button className={getNavLinkSelectedUi(NavBarLinks.top.routerLink)}>
                    <i className="fa fa-fire"/><span>Top Movies</span>
                </button>
            </Link>
            <Link to={NavBarLinks.favourites.routerLink}>
                <button className={getNavLinkSelectedUi(NavBarLinks.favourites.routerLink)}>
                    <i className="fa-regular fa-heart"/><span>My Favorites</span>
                </button>
            </Link>


        </section>
    )
}

function Test(data){
    return <h1>{JSON.stringify(data,null,2)}</h1>
}


export function NavBarWithRouter(){

    return(
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path={NavBarLinks.home.path} element={<MovieListSection/>}/>
                <Route path={NavBarLinks.trending.path} element={<MovieListSection/>}/>
                <Route path={NavBarLinks.top.path} element={<MovieListSection/>}/>
                <Route path={NavBarLinks.upcoming.path} element={<MovieListSection/>}/>
                <Route path={NavBarLinks.favourites.path} element={<BookmarksSection/>}/>
            </Routes>
        </BrowserRouter>
    )
}
