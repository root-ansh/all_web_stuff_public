const BOOKMARKS_KEY = "BOOKMARKS"
export const Bookmarks = {
    getBookMarksFromStorage: function () {
        let data = localStorage.getItem(BOOKMARKS_KEY)
        let js = data == null ? [] : JSON.parse(data)
        console.log("getBookMarksFromStorage:data", js)
        return js
    },
    containsBookMark: function (movieJS) {
        let BOOKMARKS = Bookmarks.getBookMarksFromStorage()
        return BOOKMARKS.filter(note => note.name === movieJS.name).length !== 0
    },

    containsBookMarkName: function (name) {
        let BOOKMARKS = Bookmarks.getBookMarksFromStorage()
        return BOOKMARKS.filter(note => note.name === name).length !== 0
    },



    addToBookMarks: function (movieJS) {
        let BOOKMARKS = Bookmarks.getBookMarksFromStorage()

        if (!Bookmarks.containsBookMark(movieJS)) {
            console.log("adding movie to bookmarks ", movieJS.name)
            BOOKMARKS.push(movieJS)
            console.log("new bookmarks=", BOOKMARKS.map(it => it.name))
            localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(BOOKMARKS))
        } else {
            console.log(",movie already present ", movieJS.name)
        }
    },
    removeFromBookMarks: function (movieJS) {
        let BOOKMARKS = Bookmarks.getBookMarksFromStorage()
        console.log("removing movie from bookmarks ", movieJS.name)
        let remainingBookMarks = BOOKMARKS.filter(note => note.name !== movieJS.name)
        console.log("remainingNotes", remainingBookMarks)
        BOOKMARKS = remainingBookMarks
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(BOOKMARKS))
        console.log("new bookmarks=", BOOKMARKS.map(it => it.name))

    }

}
