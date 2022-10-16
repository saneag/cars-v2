import express from 'express'
import config from './config/default.json' assert {type: 'json'}
import mongoose from 'mongoose'
import multer from 'multer'
import cors from 'cors'

import { createCarValidation, loginValidation, registerValidation } from './validations.js'
import { UserController, CarsController } from './controllers/index.js'
import { handleValidationErrors, checkAuth } from './utils/index.js'

mongoose.connect(config.mongoURI)
    .then((res) => {
        console.log('db ok')
    }).catch(err => {
        console.log(err)
    })

const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, './uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getUser)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `./uploads/${req.file.originalname}`
    })
})

app.get('/cars', CarsController.getAll)
app.get('/cars/:id', CarsController.getOne)
app.post('/cars', checkAuth, createCarValidation, handleValidationErrors, CarsController.setCar)
app.delete('/cars/:id', checkAuth, CarsController.deleteCar)
app.patch('/cars/:id', checkAuth, handleValidationErrors, CarsController.updateCar)

const PORT = process.env.PORT || 5000

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server is listening on port ' + PORT)
})