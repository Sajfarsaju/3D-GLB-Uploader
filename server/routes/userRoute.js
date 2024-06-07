const express = require('express')
const { upload3DGLB, viewModels } = require('../controllers/dashboardController')
const upload = require('../middlewares/multer')
const userRouter = express.Router()

userRouter.post('/upload3D', upload.single('data'), upload3DGLB);
userRouter.get('/models',viewModels)

module.exports = userRouter