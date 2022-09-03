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


let IS_DRAWING = false
let CV_OFFSET_X = 0
let  CV_OFFSET_Y = 0
let ctx = cvMain.getContext('2d')
let LAST_DRAWN_X = 0
let LAST_DRAWN_Y =0
let lastCirclePointsUp = []
let lastCirclePointsDown = []

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



const DrawUtils = {
    setColorsAndWidth : (fg=CURRENT_LINE_COLOR,bg=CURRENT_FILL_COLOR,width=CURRENT_MOUSE_SIZE) =>{
        ctx.strokeStyle = fg
        ctx.fillStyle=bg
        ctx.lineWidth = width
    },
    drawLineStart : (x2, y2, isFreeHand=true) =>{
        x2 = x2 - CV_OFFSET_X
        y2 = y2 - CV_OFFSET_Y

        if(isFreeHand){
            ctx.lineCap = "round"
            ctx.lineJoin = "round"
        }
        else {
            ctx.lineCap = "square"
            ctx.lineJoin = "square"
            let currDeviationX = Math.abs(x2-LAST_DRAWN_X)
            let currDeviationY = Math.abs(y2-LAST_DRAWN_Y)
            let maxDeviation =  CURRENT_MOUSE_SIZE < 5 ? (CURRENT_MOUSE_SIZE + 5) : CURRENT_MOUSE_SIZE
            x2 =  currDeviationX> maxDeviation ?  x2 : LAST_DRAWN_X
            y2 = currDeviationY > maxDeviation ? y2 : LAST_DRAWN_Y
        }
        console.log(`final x = ${x2} | y = ${y2}`)
        ctx.lineTo(x2,y2)
        ctx.stroke()
        console.log(ctx.strokeStyle)
        console.log(ctx.fillStyle)

        //ctx.beginPath()
        // ctx.fill()
        // ctx.closePath()

        LAST_DRAWN_X = x2
        LAST_DRAWN_Y =y2
    },
    drawLineEnd : () =>{
        ctx.stroke()
        ctx.beginPath()
    },
    drawSquareStart : (x2,y2) =>{
        x2 = x2 - CV_OFFSET_X
        y2 = y2 - CV_OFFSET_Y
        ctx.lineCap = "square"
        ctx.lineJoin = "square"


        let width = (LAST_DRAWN_X-x2)
        let height = (LAST_DRAWN_Y-y2)
        console.log(`x,y,wid,hei= (${x2} | ${y2} | ${width} | ${height} )`)
        ctx.strokeRect(x2,y2,width,height)
        ctx.fillRect(x2,y2,width,height)

    },
    drawSquareEnd : () =>{
        LAST_DRAWN_X = undefined
        LAST_DRAWN_Y =undefined
    },

    drawCircle : (x2,y2) =>{
        ctx.lineCap = "round"
        ctx.lineJoin = "round"

        if(lastCirclePointsUp[0]){
            console.log(lastCirclePointsUp)
            DrawUtils.setColorsAndWidth(CURRENT_FILL_COLOR)
            ctx.beginPath()
            let [a,b,c,d,e,f] = lastCirclePointsUp
            let [g,h,i,j,k,l] = lastCirclePointsDown
            ctx.bezierCurveTo(a,b,c,d,e,f)
            ctx.bezierCurveTo(g,h,i,j,k,l)
            ctx.closePath()
            ctx.stroke()
            ctx.fill()
            DrawUtils.setColorsAndWidth()
        }
        ctx.beginPath()
        let lastYAndCurrentYAverage =  (y2 + LAST_DRAWN_Y) / 2
        ctx.moveTo(LAST_DRAWN_X, lastYAndCurrentYAverage)



        ctx.bezierCurveTo(LAST_DRAWN_X, LAST_DRAWN_Y, x2, LAST_DRAWN_Y, x2,  lastYAndCurrentYAverage)
        ctx.bezierCurveTo(x2, y2, LAST_DRAWN_X, y2, LAST_DRAWN_X, lastYAndCurrentYAverage)
        ctx.closePath()
        ctx.stroke()
        ctx.fill()

        lastCirclePointsUp = [LAST_DRAWN_X, LAST_DRAWN_Y, x2, LAST_DRAWN_Y, x2,  lastYAndCurrentYAverage]
        lastCirclePointsDown = [x2, y2, LAST_DRAWN_X, y2, LAST_DRAWN_X, lastYAndCurrentYAverage]

    },
    drawCircleEnd : () =>{
        lastCirclePointsUp = []
        lastCirclePointsDown = []

    }

}


const CanvasUtils = {
    mouseBeginningToMove : (e) =>{
        LAST_DRAWN_X = e.clientX - CV_OFFSET_X
        LAST_DRAWN_Y =e.clientY -CV_OFFSET_Y

        switch (CURRENT_SELECTED){
            case btLine.id :{

                DrawUtils.setColorsAndWidth()
                DrawUtils.drawLineStart(e.clientX,e.clientY,false)
                break
            }
            case btFreeHand.id :{
                DrawUtils.setColorsAndWidth()
                DrawUtils.drawLineStart(e.clientX,e.clientY,true)
                break
            }
            case btErazer.id: {
                DrawUtils.setColorsAndWidth(CURRENT_FILL_COLOR)
                DrawUtils.drawLineStart(e.clientX,e.clientY,true)
                break
            }
            case  btSquare.id : {
                DrawUtils.setColorsAndWidth()
                DrawUtils.drawSquareStart(e.clientX,e.clientY)
                break
            }
            case btCircle.id :{
                DrawUtils.setColorsAndWidth()
                DrawUtils.drawCircle(e.clientX,e.clientY)
                break
            }

        }
    },
    mouseMoving : (e) =>{
        switch (CURRENT_SELECTED){
            case btLine.id :{
                DrawUtils.drawLineStart(e.clientX,e.clientY,false)
                break
            }
            case btFreeHand.id :{
                DrawUtils.drawLineStart(e.clientX,e.clientY,true)
                break
            }
            case btErazer.id: {
                DrawUtils.drawLineStart(e.clientX,e.clientY,true)
                break
            }
            case  btSquare.id : {
                DrawUtils.drawSquareStart(e.clientX,e.clientY)
                break
            }
            case btCircle.id :{
                DrawUtils.drawCircle(e.clientX,e.clientY)
                break
            }

        }
    },
    mouseUnpressedAfterMoving : (e) =>{
        switch (CURRENT_SELECTED){
            case btLine.id :
            case btFreeHand.id :
            case btErazer.id: {
                DrawUtils.drawLineEnd()
                break
            }
            case  btSquare.id :{
                DrawUtils.drawSquareEnd()
                break
            }
            case btCircle.id : {
                DrawUtils.drawCircleEnd()
                break
            }
        }
    }
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
    CanvasUtils.mouseBeginningToMove(e)
})
cvMain.addEventListener('mouseup',(e)=>{
    IS_DRAWING =false
    CanvasUtils.mouseUnpressedAfterMoving(e)
})
cvMain.addEventListener('mousemove',(e)=>{
    if(IS_DRAWING){
        CanvasUtils.mouseMoving(e)
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

