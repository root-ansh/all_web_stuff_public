import {NavBarLinks} from "../datasource/navBarLinks";

export function getCurrentUrl(routerLink,pageNum) {
    let url = "https://api.themoviedb.org/3/movie/"
    let key = "93479ec954971eca6bde81ea710d13a2"
    let path = ""
    switch (routerLink) {
        case NavBarLinks.upcoming.routerLink:
            path = "upcoming"
            break
        case NavBarLinks.top.routerLink:
            path = "top_rated"
            break

        case NavBarLinks.home.routerLink:
        case NavBarLinks.trending.routerLink :
        default:
            path = "now_playing"
    }

    return `${url}${path}?api_key=${key}&page=${pageNum}`
}
