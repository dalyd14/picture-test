const multer = require('multer')

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, './images')
    },
    filename: (req, file, cd) => {
        cd(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({ storage: fileStorageEngine })

module.exports = upload