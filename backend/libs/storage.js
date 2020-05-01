const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/storage/imgs')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}`)
    }
  })
   
  const upload = multer({ storage })
  module.exports = upload