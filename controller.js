const router = require('express').Router()
const upload = require('./config/multer-config')
const fs = require('fs')
const Image = require('./Image')

if (!fs.existsSync('./images')){
    fs.mkdirSync('./images');
}

router.post('/save-image', upload.single('imageFile'), async (req, res) => {
    const obj = {
        img: {
            data: fs.readFileSync(req.file.path),
            contentType: req.file.mimetype
        }
    }
    const img = await Image.create(obj)
    fs.rmdirSync('./images', { recursive: true });
    fs.mkdirSync('./images');
    res.json({ message: "success", data: img })
})

router.get('/get-images', async (req, res) => {
    const images = await Image.find().lean()
    res.json({images: images})
})

module.exports = router