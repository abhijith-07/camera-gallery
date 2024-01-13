setTimeout(()=>{
    
if(db) {
    let dbTransaction = db.transaction("video", "readonly")
    let videoStore = dbTransaction.objectStore("video")
    let videoRequest = videoStore.getAll()
    videoRequest.addEventListener( "success",(e) => {
        let videoResult = videoRequest.result

        let galleryContainer = document.querySelector(".gallery-container")
        videoResult.forEach((videoObj) => {
            let mediaElem = document.createElement("div")
            let url = URL.createObjectURL(videoObj.blobData)
            mediaElem.innerHTML = `<video autoplay src=${url}></video>`         
            galleryContainer.appendChild(mediaElem)   
        })
    })
}
}, 100)