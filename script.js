let video = document.querySelector("video")

let videoRecorderBtn = document.querySelector(".video-btn")
let captureBtn = document.querySelector(".capture-btn")
let recordFlag = false
let mediaRecorder
let chunks = [] // video stream in chunks

let constraints = {
    video: true,
    audio: true
}

navigator.mediaDevices.getUserMedia(constraints)
.then((stream)=>{
    video.srcObject = stream
    mediaRecorder = new MediaRecorder(stream)

    mediaRecorder.addEventListener("start", (e) => {
        chunks = []
    })
    
    mediaRecorder.addEventListener("dataavailable",(e)=>{
        chunks.push(e.data)
    })

    mediaRecorder.addEventListener("stop", (e)=>{
        let blob = new Blob(chunks, { type: "video/mp4" })
        let videoURL = URL.createObjectURL(blob)

        let a = document.createElement("a")
        a.href = videoURL
        a.download = "stream.mp4"
        a.click()
    })
})

videoRecorderBtn.addEventListener("click", (e) => {
    if(!mediaRecorder) return

    recordFlag = !recordFlag
    if (recordFlag) {
        mediaRecorder.start() 
        videoRecorderBtn.classList.add("scale-record")
        startTimer()
    }
    else{
        mediaRecorder.stop()
        videoRecorderBtn.classList.remove("scale-record")
        stopTimer()
    }
})

captureBtn.addEventListener("click", (e) => {
    captureBtn.classList.add("scale-capture")
    
    let canvas = document.createElement("canvas")
    let ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    let imgURL = canvas.toDataURL()
    let a = document.createElement("a")
    a.href = imgURL
    a.download = "img.png"
    a.click()
})

let timerId
let counter = 0
let timer = document.querySelector(".timer")

function startTimer() {
    timer.classList.add("timer-start")
    function displayTimer(){  
        counter++
        let totalSeconds = counter;
        let hours = Number.parseInt(totalSeconds/3600)
        totalSeconds = Number.parseInt(totalSeconds%3600)

        let minutes = Number.parseInt(totalSeconds/60)
        totalSeconds = Number.parseInt(totalSeconds%60)
        
        let seconds = Number.parseInt(totalSeconds)

        hours = hours<10?`0${hours}`:hours
        minutes = minutes<10?`0${minutes}`:minutes
        seconds = seconds<10?`0${seconds}`:seconds

        timer.innerText = `${hours}:${minutes}:${seconds}`
    }
    timerId = setInterval(displayTimer, 1000)
}

function stopTimer() {
    timer.classList.remove("timer-start")
    clearInterval(timerId)
    counter = 0
    timer.innerText = "00:00:00"
}

// Filter
let filters = document.querySelectorAll(".filter")
let filterLayer = document.querySelector(".filter-layer")

filters.forEach((filter)=>{
    filter.addEventListener("click", ()=>{
        let style = getComputedStyle(filter)
        let bgColor = style.backgroundColor
        filterLayer.style.backgroundColor = bgColor
    })
})