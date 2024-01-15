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
                <div class="media-controls">
                    <div class="delete" id="${videoObj.videoID}">
                        <span class="material-symbols-outlined">
                            delete
                        </span>
                    </div>
                    <div class="download">
                        <a href=${videoURL} download="video.mp4">
                            <span class="material-symbols-outlined">
                                download
                            </span>
                        </a>
                    </div>
                </div>
            </div>`         
            galleryContainer.appendChild(mediaElem)   

            // Delete Video
            let deleteBtn = mediaElem.querySelector(".delete")
            deleteBtn.addEventListener("click", deleteListener) 
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
                <div class="media-controls">
                    <div class="delete" id=${imageObj.imageID}>
                        <span class="material-symbols-outlined">
                            delete
                        </span>
                    </div>
                    <div class="download">
                        <a href=${imgURL} download="img.png">
                            <span class="material-symbols-outlined">
                                download
                            </span>
                        </a>
                    </div>
                </div>
            </div>`         
            galleryContainer.appendChild(mediaElem)  

            // Delete Function
            let deleteBtn = mediaElem.querySelector(".delete")
            deleteBtn.addEventListener("click", deleteListener) 
        })
    })
}
}, 100)

function deleteListener(e) {
    let id = e.target.parentElement.getAttribute("id")
    if (id.slice(0, 3) == 'img') {
        let imgDbTransaction = db.transaction("image", "readwrite")
        let imageStore = imgDbTransaction.objectStore("image")
        imageStore.delete(id)
        e.target.parentElement.parentElement.parentElement.remove()
        window.location.reload()
    }
    else if (id.slice(0, 3) == 'vid') {
        let dbTransaction = db.transaction("video", "readwrite")
        let videoStore = dbTransaction.objectStore("video")
        videoStore.delete(id)
        e.target.parentElement.parentElement.parentElement.remove()
        window.location.reload()
    }
}