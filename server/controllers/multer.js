const storage = require('multer').memoryStorage()

const upload = require('multer')({storage: storage})



module.exports = upload
