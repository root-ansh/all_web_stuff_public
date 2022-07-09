function getDataFromStorage() {
    let data = localStorage.getItem("hello_jira")
    let js = data == null ? [] : JSON.parse(data)
    console.log("data", js)
    return js
}
function setDataToStorage(){
    localStorage.setItem("hello_jira",JSON.stringify(ALL_NOTES))
}

let btHelp =document.querySelector('#bt_help')
let btFilter = document.querySelector('#bt_filter')
let secFilters = document.querySelector('#sec_filters')
let btMode = document.querySelector('#bt_mode')
let secRandom = document.querySelector(".sec_random")
let secFiltered = document.querySelector(".sec_filtered")
let secTodo = document.querySelector(".sec_todo")
let secPro = document.querySelector(".sec_progress")
let secDone = document.querySelector(".sec_done")
let secFail = document.querySelector(".sec_fail")
let btDone = document.querySelector('#bt_done')
let btFail = document.querySelector('#bt_fail')
let btTodo = document.querySelector('#bt_todo')
let btSamples = document.querySelector('#bt_sample')
let btProgress = document.querySelector('#bt_progress')
let btAdd = document.querySelector('#bt_add')
let popup = document.querySelector(".popup")
let btCancel = document.querySelector('#bt_popup_closes')
let btSave = document.querySelector('#bt_popup_save')
let popupTitle = document.querySelector('.popup_title')
let popupDetails = document.querySelector('.popup_detail')
let popupId = document.querySelector('.popup_id')
let popupBtFail = document.querySelector('#bt_popup_fail')
let popupBtDone = document.querySelector('#bt_popup_done')
let popupBtProgress = document.querySelector('#bt_popup_progress')
let popupBtTodo = document.querySelector('#bt_popup_todo')
let CURRENT_MODE = btMode.textContent//All notes//Jira
let MODE_JIRA = "Jira Mode"
let MODE_ALL_NOTES = "All Notes Mode"
let ALL_NOTES = getDataFromStorage()
let CURRENT_FILTERS = []


function initClicksForAllGeneratedNotes(){

    let allNotesEditButtons = document.querySelectorAll('.bt_note_edit')
    let allNotesSelectButtons = document.querySelectorAll('.bt_note_select')
    let allNotesPriorityButtons = document.querySelectorAll('.bt_priority')
    console.log("all note edit buttons=",allNotesEditButtons)
    console.log("all note edit buttons=",allNotesPriorityButtons)

    allNotesEditButtons.forEach(
        element => element.addEventListener('click',
            () => {
                let id = element.parentElement.querySelector('.note_id').textContent
                let data = ALL_NOTES.find(it=>it.id===id)
                showHidePopup(data)
            }
        )
    )
    allNotesPriorityButtons.forEach(
        element => element.addEventListener('click',
            () => {
                console.log('click called for element:',element)
                let id = element.parentElement.querySelector('.note_id').textContent
                let pos = ALL_NOTES.findIndex(it=>it.id===id)
                let data = ALL_NOTES[pos]
                let priority = data.priority.replace('#','')
                let newP = JSON.parse(JSON.stringify(data))

                console.log(id)
                console.log(pos)
                console.log(data)
                console.log(priority)
                console.log(newP)

                if(priority===popupBtTodo.id) newP.priority = '#'+popupBtProgress.id
                if(priority===popupBtProgress.id) newP.priority = '#'+popupBtDone.id
                if(priority===popupBtDone.id) newP.priority = '#'+popupBtFail.id
                if(priority===popupBtFail.id) newP.priority = '#'+popupBtTodo.id

                ALL_NOTES[pos]=newP
                updateDataOnUi()
            }
        )
    )
    allNotesSelectButtons.forEach(
        element => element.addEventListener('click',
            () => {
                console.log('click called for element:',element)

                let note = element.parentElement.parentElement
                if(note.classList.contains('note_selected')){
                    note.classList.remove('note_selected')
                    element.classList.replace('bg_red_dark', 'bg_grey')
                }
                else {
                    note.classList.add('note_selected')
                    element.classList.replace( 'bg_grey','bg_red_dark')
                }

               let selectedNotes = document.querySelectorAll('.note_selected')
                let deleteBtn = document.querySelector('#bt_delete')
                if (selectedNotes.length > 0) {
                    deleteBtn.classList.remove('hide')
                    deleteBtn.addEventListener('click', () => {
                        let ids = []
                        selectedNotes.forEach(ele => ids.push(ele.querySelector('.note_id').textContent))
                        console.log("ids", ids)
                        let remainingNotes = ALL_NOTES.filter(note => {
                            let isSelected = false
                            ids.forEach(id => {if (id === note.id) isSelected = true})
                            return !isSelected
                        })
                        console.log("remainingNotes", remainingNotes)
                        ALL_NOTES = remainingNotes
                        updateDataOnUi()
                        document.querySelector('#bt_delete').classList.add('hide')

                    })
                }
                else{
                    deleteBtn.classList.add('hide')
                }
            }
        )
    )

}


function createElementFromHTML(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}
function updateDataOnUi(allNotes=ALL_NOTES){
    console.log("allNotes",allNotes)
    function button(priority){
        console.log("button: received priority",priority)

        switch (priority.replace('#','')){
            case popupBtTodo.id : return `<button class="bt bt_priority bt_curved4 bg_grey"><i class="fa fa-bell"></i><span>TO DO</span> </button>`
            case popupBtProgress.id : return `<button class="bt bt_priority bt_curved4 bg_blue"><i class="fa fa-clock"></i><span>IN PROGRESS</span></button>`
            case popupBtDone.id : return `<button class="bt bt_priority bt_curved4 bg_green"><i class="fa fa-check-circle"></i><span>DONE</span></button>`
            case popupBtFail.id : return `<button class="bt bt_priority bt_curved4 bg_red"><i class="fa fa-exclamation-triangle"></i><span>FAILED</span></button>`
            default :  return `<button class="bt bt_priority bt_curved4 bg_blue"><i class="fa fa-clock"></i><span>IN PROGRESS</span></button>`
        }

    }
    function html(note){
        console.log("html: received note",note)
        let btID = note.priority
        console.log("Will be sending the id of:",btID)
        return `<div class="note">
                    <h1>${note.title}</h1>
                    <p>${note.detail}</p>
                    <hr>
                    <div class="note_options">
                        <span class="note_id hide">${note.id}</span>
                        <button class="bt bt_note_edit bt_rounded bg_grey hover_blue expand_onhover_parent"><i class="fa fa-edit"></i> <span class="expand_on_hover">Edit note</span></button>
                        <button class="bt bt_note_select bt_rounded bg_grey hover_blue expand_onhover_parent"><i class="fa fa-trash"></i><span class="expand_on_hover">Select for deletion</span></button>
                        ${button(btID)}
                    </div>
                </div>`
    }

    let notesAndPriority = allNotes.map(it => ({priority: it.priority, html: createElementFromHTML(html(it))}))
    notesAndPriority.forEach(obj => {
        console.log("priority", obj.priority)
        console.log("html:")
        console.log(obj.html)
        console.log("================================")
    })
    if(CURRENT_MODE ===MODE_ALL_NOTES) {
        secRandom.replaceChildren(...notesAndPriority.map(it=>it.html))
    }else {
        let todos = notesAndPriority.filter(it=>it.priority==='#'+popupBtTodo.id).map(it=>it.html)
        let inpo = notesAndPriority.filter(it=>it.priority==='#'+popupBtProgress.id).map(it=>it.html)
        let done = notesAndPriority.filter(it=>it.priority==='#'+popupBtDone.id).map(it=>it.html)
        let fail = notesAndPriority.filter(it=>it.priority==='#'+popupBtFail.id).map(it=>it.html)
        secTodo.replaceChildren(...todos)
        secPro.replaceChildren(...inpo)
        secDone.replaceChildren(...done)
        secFail.replaceChildren(...fail)

    }
    initClicksForAllGeneratedNotes()
    setDataToStorage()


}
function popupSetSelected(selectorBtnId) {
    popupBtFail.classList.replace('bg_blue_dark', 'bg_grey')
    popupBtDone.classList.replace('bg_blue_dark', 'bg_grey')
    popupBtProgress.classList.replace('bg_blue_dark', 'bg_grey')
    popupBtTodo.classList.replace('bg_blue_dark', 'bg_grey')
    if(selectorBtnId && selectorBtnId!==""){
        document.querySelector(selectorBtnId).classList.replace('bg_grey', 'bg_blue_dark')
    }
}
function showHidePopup(popupData={id:'',title: '',detail: '',priority: ''}){
    const title = popupData.title ? popupData.title : ""
    const detail = popupData.detail  ?  popupData.detail : ""
    const selectedPrioritybtnId = popupData.priority ? popupData.priority : ""
    const id = popupData.id ? popupData.id : ""
    popupTitle.textContent = title
    popupDetails.textContent = detail
    popupId.textContent =id
    popupSetSelected(selectedPrioritybtnId)
    if (popup.classList.contains("hide")) {
        popup.classList.remove("hide")
    } else {
        popup.classList.add("hide")
    }

}
function runFilterOnData(){
    console.log("CURRENT_FILTERS",CURRENT_FILTERS)
    if(CURRENT_FILTERS.length===0||CURRENT_FILTERS.length===4){
        updateDataOnUi(ALL_NOTES)
    }
    else {
        let filteredArray = []
        CURRENT_FILTERS.forEach(filterP=>{
            let results = ALL_NOTES.filter(it=>it.priority==='#'+filterP)
            filteredArray = filteredArray.concat(results)
        })
        console.log("filteredArray",filteredArray)
        updateDataOnUi(filteredArray)
    }

}

btHelp.addEventListener('click', () => {
    let instructions = document.querySelector('.instructions')
    if (instructions.classList.contains('hide')){
        instructions.classList.remove('hide')
    }
    else {instructions.classList.add('hide')}
})
btFilter.addEventListener('click', () => {
    if (secFilters.classList.contains('hide')) {
        secFilters.classList.remove('hide')
    } else {
        secFilters.classList.add('hide')
    }
})
btDone.addEventListener('click', () => {
    let filterId = popupBtDone.id
    let idxIfPresent = CURRENT_FILTERS.findIndex(it => it === filterId)
    if (btDone.classList.contains('bg_green')) {
        btDone.classList.remove('bg_green')
        btDone.classList.add('bg_green_dark')
        if (idxIfPresent === -1) {
            CURRENT_FILTERS.push(filterId)
        }
    } else {
        btDone.classList.add('bg_green')
        btDone.classList.remove('bg_green_dark')
        if (idxIfPresent !== -1) {
            CURRENT_FILTERS.splice(idxIfPresent, 1)
        }
    }
    runFilterOnData()
})
btFail.addEventListener('click', () => {
    let filterId = popupBtFail.id
    let idxIfPresent = CURRENT_FILTERS.findIndex(it => it === filterId)
    if (btFail.classList.contains('bg_red')) {
        btFail.classList.remove('bg_red')
        btFail.classList.add('bg_red_dark')
        if (idxIfPresent === -1) {
            CURRENT_FILTERS.push(filterId)
        }
    } else {
        btFail.classList.add('bg_red')
        btFail.classList.remove('bg_red_dark')
        if (idxIfPresent !== -1) {
            CURRENT_FILTERS.splice(idxIfPresent, 1)
        }
    }
    runFilterOnData()

})
btTodo.addEventListener('click', () => {
    let filterId = popupBtTodo.id
    let idxIfPresent = CURRENT_FILTERS.findIndex(it => it === filterId)
    if (btTodo.classList.contains('bg_grey')) {
        btTodo.classList.remove('bg_grey')
        btTodo.classList.add('bg_grey_dark')
        if (idxIfPresent === -1) {
            CURRENT_FILTERS.push(filterId)
        }
    } else {
        btTodo.classList.add('bg_grey')
        btTodo.classList.remove('bg_grey_dark')
        if (idxIfPresent !== -1) {
            CURRENT_FILTERS.splice(idxIfPresent, 1)
        }
    }
    runFilterOnData()

})
btProgress.addEventListener('click', () => {
    let filterId = popupBtProgress.id
    let idxIfPresent = CURRENT_FILTERS.findIndex(it => it === filterId)
    if (btProgress.classList.contains('bg_blue')) {
        btProgress.classList.remove('bg_blue')
        btProgress.classList.add('bg_blue_dark')
        if (idxIfPresent === -1) {
            CURRENT_FILTERS.push(filterId)
        }
    } else {
        btProgress.classList.add('bg_blue')
        btProgress.classList.remove('bg_blue_dark')
        if (idxIfPresent !== -1) {
            CURRENT_FILTERS.splice(idxIfPresent, 1)
        }
    }
    runFilterOnData()

})
btMode.addEventListener('click', () => {
    if (btMode.textContent === MODE_ALL_NOTES) {
        CURRENT_MODE = MODE_JIRA
        btMode.textContent = CURRENT_MODE

        btFilter.classList.add('hide')
        if (!secFilters.classList.contains('hide')) {
            secFilters.classList.add('hide')
        }

        secRandom.classList.add('hide')
        secFiltered.classList.remove('hide')
    } else {
        CURRENT_MODE = MODE_ALL_NOTES
        btMode.textContent = CURRENT_MODE
        btMode.classList.add("bg_blue")
        btFilter.classList.remove('hide')
        secRandom.classList.remove('hide')
        secFiltered.classList.add('hide')
    }
    updateDataOnUi()
})
btAdd.addEventListener('click', () => {
    let randomId =  "id__" + Math.random().toString(16).slice(2)
    showHidePopup({id:randomId})
})
btCancel.addEventListener('click',()=> showHidePopup())
popupBtFail.addEventListener('click',()=> popupSetSelected('#bt_popup_fail'))
popupBtDone.addEventListener('click',()=> popupSetSelected('#bt_popup_done'))
popupBtProgress.addEventListener('click',()=> popupSetSelected('#bt_popup_progress'))
popupBtTodo.addEventListener('click',()=> popupSetSelected('#bt_popup_todo'))
btSave.addEventListener('click',()=>{
    const id= popupId.textContent
    const title = popupTitle.textContent
    const content = popupDetails.textContent

    let selectedBtn =  [popupBtTodo,popupBtProgress,popupBtDone,popupBtFail].find(it=>it.classList.contains('bg_blue_dark'))

    const pt =   "#" + (selectedBtn !== undefined ? selectedBtn.id : popupBtTodo.id)

    let newEntry = {id:id,title: title,detail: content,priority: pt}
    console.log(newEntry)

    const isAlreadyPresent = ALL_NOTES.findIndex(it => it.id === id)
    if(isAlreadyPresent===-1)ALL_NOTES.push(newEntry)
    else  ALL_NOTES[isAlreadyPresent]=newEntry
    console.log(ALL_NOTES)

    showHidePopup()
    updateDataOnUi()
})
btSamples.addEventListener('click',()=>{
    ALL_NOTES = [
        {
            id: "id1",
            title: "This is Your Task",
            detail: "You can add all kinds of details here. Select new task to create a new note",
            priority: '#'+popupBtTodo.id
        },
        {
            id: "id2",
            title: "Jira Mode!",
            detail: "In jira mode, your notes gets automatically sorted. But what happens when you press the Jira mode button?",
            priority: '#'+popupBtProgress.id
        },
        {
            id: "id3",
            title: "Error while typing?",
            detail: "Select the edit icon on a note, edit and save again!",
            priority: '#'+popupBtFail.id
        },


        {
            id: "id4",
            title: "Lets not see each other again :(",
            detail: "If you don't wanna see a note again, press the select icon and then delete from the top!",
            priority: '#'+popupBtFail.id
        },

        {
            id: "id5",
            title: "Auto Save!!",
            detail: "Refresh this page and magically find all your notes still intact. you can even close your browser/ this tab :D",
            priority: '#'+popupBtDone.id
        }
    ]
    updateDataOnUi()
})


updateDataOnUi()





