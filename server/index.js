const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path');
const cors = require('cors');
const userRoute = require('./routes/userRoute')
const connectDB = require('./config/dbConfig')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors());
app.use(cookieParser());

app.use('/',userRoute)
app.use('/uploads', cors(), express.static(path.join(__dirname, 'uploads')));


connectDB()

let port = process.env.PORT || 4000;
app.listen(port , ()=> console.log(`Server Connected at ${port}`))