
const multer = require('multer');
const mime_Type = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg'
};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = mime_Type[file.mimetype];
        let error = new Error('Invalid MIME type'); //check valid image type
        if (isValid) {
            error = null;
        }
        cb(error, 'backend/images')   //  path to store file
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = mime_Type[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext)
    }
});

module.exports =  multer({ storage: storage }).single('image');