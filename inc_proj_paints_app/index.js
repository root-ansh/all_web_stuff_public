// noinspection JSUnusedLocalSymbols

const btClear = document.querySelector('#bt_clear')
const btSquare = document.querySelector('#bt_square')
const btCircle = document.querySelector('#bt_circle')
const btTriangle = document.querySelector('#bt_trian')
const btLine = document.querySelector('#bt_line')
const btFreeHand = document.querySelector('#bt_free')
const btErazer = document.querySelector('#bt_erazer')
const btLineWidth = document.querySelector('#bt_size')
const btDrawText = document.querySelector('#bt_text')
const btForegroundColor = document.querySelector('#bt_fg')
const btBackgroundColor = document.querySelector('#bt_bg')
const btUndo = document.querySelector('#bt_undo')
const btRedo = document.querySelector('#bt_redo')
const secCanvas = document.querySelector(".sec_white_board")
const cvMain = document.querySelector("#canvas_white_board")


let CURRENT_SELECTED = btFreeHand.id
let CURRENT_LINE_COLOR = btForegroundColor.value
let CURRENT_FILL_COLOR = btBackgroundColor.value
let CURRENT_MOUSE_SIZE = btLineWidth.value
let MAX_ST_DRAW_DEVIATION =0


let IS_DRAWING = false
let CV_OFFSET_X = 0
let  CV_OFFSET_Y = 0
let DRAWING_START_X = 0
let DRAWING_START_Y = 0
let ctx = cvMain.getContext('2d')
let LAST_DRAWN_X = 0
let LAST_DRAWN_Y =0

function updateMouseProperties(obj) {
    CURRENT_SELECTED = obj.selected != null ? obj.selected : CURRENT_SELECTED
    CURRENT_LINE_COLOR = obj.color != null ? obj.color : CURRENT_LINE_COLOR
    CURRENT_FILL_COLOR = obj.fill !=null? obj.fill : CURRENT_FILL_COLOR
    CURRENT_MOUSE_SIZE = obj.thickness != null ? obj.thickness : CURRENT_MOUSE_SIZE
    console.log(`${CURRENT_SELECTED} | ${CURRENT_LINE_COLOR} | ${CURRENT_MOUSE_SIZE} | ${CV_OFFSET_X} | ${CV_OFFSET_Y}`)
}

function toggleSelection(bt){
    [btSquare,btCircle,btTriangle,btLine,btFreeHand,btErazer,btLineWidth, btDrawText,btBackgroundColor,btForegroundColor,btUndo,btRedo].forEach(it=>it.classList.remove('bl_wh'))
    bt.classList.add('bl_wh')
}

window.addEventListener('resize', (e) => {
    CV_OFFSET_X = cvMain.offsetLeft
    CV_OFFSET_Y = cvMain.offsetTop
    cvMain.width = secCanvas.getBoundingClientRect().right - CV_OFFSET_X
    cvMain.height = secCanvas.getBoundingClientRect().bottom - CV_OFFSET_Y
},true)

btClear.addEventListener('click',(e)=>{
    CV_OFFSET_X = cvMain.offsetLeft
    CV_OFFSET_Y = cvMain.offsetTop
    cvMain.width = secCanvas.getBoundingClientRect().right - CV_OFFSET_X
    cvMain.height = secCanvas.getBoundingClientRect().bottom - CV_OFFSET_Y
})

cvMain.addEventListener('mousedown',(e)=>{
    IS_DRAWING = true
    DRAWING_START_X = e.clientX
    DRAWING_START_Y = e.clientY
})
cvMain.addEventListener('mouseup',(e)=>{
    IS_DRAWING =false
    ctx.stroke()
    ctx.beginPath()
})
cvMain.addEventListener('mousemove',(e)=>{
    ctx.fillStyle = CURRENT_FILL_COLOR
    ctx.strokeStyle=CURRENT_LINE_COLOR
    ctx.lineWidth = CURRENT_MOUSE_SIZE
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    console.log(`LAST_DRAWN_X=${LAST_DRAWN_Y} | LAST_DRAWN_Y=${LAST_DRAWN_Y} |  clientX = ${e.clientX} | CV_OFFSET_X=${CV_OFFSET_X} | clientY=${e.clientY} | CV_OFFSET_Y=${CV_OFFSET_Y} `)
    if(IS_DRAWING){
        switch (CURRENT_SELECTED){
            case btLine.id :
            case btFreeHand.id :
            case btErazer.id: {
                if(CURRENT_SELECTED === btErazer.id){
                    ctx.strokeStyle = CURRENT_FILL_COLOR
                    MAX_ST_DRAW_DEVIATION = 0
                }
                if(CURRENT_SELECTED === btFreeHand.id){
                    MAX_ST_DRAW_DEVIATION = 0
                }
                if(CURRENT_SELECTED === btLine.id){
                    MAX_ST_DRAW_DEVIATION = CURRENT_MOUSE_SIZE < 5 ? (CURRENT_MOUSE_SIZE + 5) : CURRENT_MOUSE_SIZE
                }
                let newX = e.clientX-CV_OFFSET_X
                let newY = e.clientY-CV_OFFSET_Y
                let finalX = (Math.abs(newX-LAST_DRAWN_X)<MAX_ST_DRAW_DEVIATION) ? LAST_DRAWN_X : newX
                let finalY = (Math.abs(newY-LAST_DRAWN_Y)<MAX_ST_DRAW_DEVIATION) ? LAST_DRAWN_Y : newY
                ctx.lineTo(finalX,finalY)
                ctx.stroke()
                LAST_DRAWN_X = finalX
                LAST_DRAWN_Y = finalY
                break
            }
            case  btCircle.id : {
                break
            }
            case  btSquare.id :{

                let newX = e.clientX-CV_OFFSET_X
                let newY = e.clientY-CV_OFFSET_Y
                let finalX = (Math.abs(newX-LAST_DRAWN_X)<MAX_ST_DRAW_DEVIATION) ? LAST_DRAWN_X : newX
                let finalY = (Math.abs(newY-LAST_DRAWN_Y)<MAX_ST_DRAW_DEVIATION) ? LAST_DRAWN_Y : newY
                ctx.fillRect(LAST_DRAWN_X,LAST_DRAWN_Y,finalX,finalY)
                LAST_DRAWN_X = finalX
                LAST_DRAWN_Y = finalY
                break
            }
        }


    }
})

btSquare.addEventListener('click',(e)=>{
    toggleSelection(btSquare)
    updateMouseProperties({selected:btSquare.id})
})
btCircle.addEventListener('click',(e)=>{
    toggleSelection(btCircle)
    updateMouseProperties({selected:btCircle.id})

})
btTriangle.addEventListener('click',(e)=>{
    toggleSelection(btTriangle)
    updateMouseProperties({selected:btTriangle.id})

})
btLine.addEventListener('click',(e)=>{
    toggleSelection(btLine)
    updateMouseProperties({selected:btLine.id,color:btForegroundColor.value})
})
btFreeHand.addEventListener('click',(e)=>{
    toggleSelection(btFreeHand)
    updateMouseProperties({selected:btFreeHand.id,color:btForegroundColor.value})

})
btLineWidth.addEventListener('change',(e)=>{
    updateMouseProperties({thickness:btLineWidth.value})
})
btDrawText.addEventListener('click',(e)=>{
    toggleSelection(btDrawText)
    updateMouseProperties({selected:btDrawText.id})

})
btErazer.addEventListener('click',(e)=>{
    toggleSelection(btErazer)
    updateMouseProperties({selected:btErazer.id})
})
btForegroundColor.addEventListener('change',(e)=>{
    updateMouseProperties({color:btForegroundColor.value})

})
btBackgroundColor.addEventListener('change',(e)=>{
    updateMouseProperties({fill:btBackgroundColor.value})
})
btUndo.addEventListener('click',(e)=>{
    console.log("undo")
})
btRedo.addEventListener('click',(e)=>{
    console.log("redo")
})



window.dispatchEvent(new Event('resize'))

