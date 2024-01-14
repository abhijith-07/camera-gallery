setTimeout(()=>{
    
if(db) {
    // video
    let dbTransaction = db.transaction("video", "readonly")
    let videoStore = dbTransaction.objectStore("video")
    let videoRequest = videoStore.getAll()
    videoRequest.addEventListener( "success",(e) => {
        let videoResult = videoRequest.result

        let galleryContainer = document.querySelector(".gallery-container")
        videoResult.forEach((videoObj) => {
            let mediaElem = document.createElement("div")
            let videoURL = URL.createObjectURL(videoObj.blobData)
            mediaElem.innerHTML = 
            `<div class="media-container">
                <div class="media"><video autoplay loop src=${videoURL}></video></div>
                <div class="delete">Delete</div>
                <div class="download"><a href=${videoURL} download="video.mp4">Download</a></div>
            </div>`         
            galleryContainer.appendChild(mediaElem)   
        })
    })

    // image
    let imgDbTransaction = db.transaction("image", "readonly")
    let imageStore = imgDbTransaction.objectStore("image")
    let imageRequest = imageStore.getAll()
    imageRequest.addEventListener( "success",(e) => {
        let imageResult = imageRequest.result
        let galleryContainer = document.querySelector(".gallery-container")
        imageResult.forEach((imageObj) => {
            let mediaElem = document.createElement("div")

            let imgURL = imageObj.url

            mediaElem.innerHTML = 
            `<div class="media-container">
                <div class="media"><img src="${imgURL}" /></div>
                <div class="delete">Delete</div>
                <div class="download"><a href=${imgURL} download="img.png">Download</a></div>
            </div>`         
            galleryContainer.appendChild(mediaElem)   
        })
    })
}
}, 100)