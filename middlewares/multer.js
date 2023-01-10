const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({});

const fileFilter = ((req, file, cb) => {
        if(!file.mimetype.includes('image')){
            return cb('Invalid image format', false)
        }
            console.log(file)
            cb(null, true)
});


module.exports = multer({
    storage, fileFilter
});