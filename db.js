let db
let openRequest = indexedDB.open("myDB")

openRequest.addEventListener("success", (e) => {
    console.log("Success")
    db = openRequest.result
})

openRequest.addEventListener("error", (e) => {
    console.log("Error:", e)
})

openRequest.addEventListener("upgradeneeded", (e) => {
    console.log("Upgrade Needed")
    db = openRequest.result
    
    db.createObjectStore("video", {keyPath: 'videoID'})
    db.createObjectStore("image", {keyPath: 'imageID'})
})