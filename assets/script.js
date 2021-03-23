const pictureForm = document.getElementById("picture-form")
const pictureUploader = document.getElementById("myFile")
const imgContainer = document.getElementById("img-container")
const getImgBtn = document.getElementById("get-images")

const handleSubmit = async event => {
    event.preventDefault()

    document.getElementById("saving").style.display = "block"

    const formData = new FormData()
    formData.append('imageFile', pictureUploader.files[0])

    const response = await fetch('/api/save-image', {
        method: 'POST',
        body: formData
    })

    const jsonResp = await response.json()
    console.log(jsonResp)
    pictureUploader.value = null
    document.getElementById("saving").style.display = "none"
}

const handleGetImages = async () => {
    document.getElementById("loading").style.display = "block"
    const response = await fetch('/api/get-images')

    const images = await response.json()

    const readyImgs = images.images.map(img => {
        return `data:${img.img.contentType};base64,${img.img.data.toString('base64')}`
    })

    addImages(readyImgs)
    document.getElementById("loading").style.display = "none"
}

const addImages = (images) => {
    imgContainer.innerHTML = ''
    images.forEach(img => {
        const newImg = document.createElement("img")
        newImg.classList.add("picture")
        newImg.src = img

        imgContainer.appendChild(newImg)
    })
}

pictureForm.addEventListener("submit", handleSubmit)
getImgBtn.addEventListener("click", handleGetImages)