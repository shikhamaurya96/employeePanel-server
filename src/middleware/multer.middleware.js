const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("req",req.body)
        console.log("dest folder")
      cb(null, './public/')
    },
    filename: function (req, file, cb) {
      console.log("file name")
      cb(null, file.originalname)
    }
  })
  
  exports.upload = multer({
    storage: storage,
  })
  //now you will have access of file path 
